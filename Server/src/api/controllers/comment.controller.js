const apiResponse = require('../helpers/api.response.helper')
const Languages = require('../utils/languages')
const fs = require('fs')
const getNextSequenceValue = require('../utils/icrement.db')
const Files = require('../models/file.model')
const { Comment, validate } = require('../models/comments.model')
const path = require('path')
const directoryFile = path.join(__dirname, '../../../upload/')
const { BASEURL_FILE } = require('../utils/global')
const moment = require('moment')
const { Ideas } = require('../models/idea.model')

function unlinkFile (file) {
  fs.unlink(file, function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log(`${file}`)
    }
  })
}
function removeElement (array, elem) {
  const index = array.indexOf(elem)
  if (index > -1) {
    array.splice(index, 1)
  }
}
function timeComment (diffMinutes) {
  let message
  if (diffMinutes < 1) {
    message = Languages.JUST_FINISHED
  } else if (diffMinutes === 1) {
    message = `${diffMinutes} minute ago`
  } else if (diffMinutes < 60) {
    message = `${diffMinutes} minutes ago`
  } else if (diffMinutes === 60) {
    message = `${Math.floor(diffMinutes / 60)} hour ago`
  } else if (diffMinutes < 1440) {
    message = `${Math.floor(diffMinutes / 60)} hours ago`
  } else if (diffMinutes === 1440) {
    message = `${Math.floor(diffMinutes / 1440)} day ago`
  } else if (diffMinutes < 10080) {
    message = `${Math.floor(diffMinutes / 1440)} days ago`
  } else {
    message = Languages.LONG_TIME
  }
  return message
}

module.exports = {
  async createComment (req, res) {
    const listFile = req.listFile
    try {
      const _userId = req._userId
      const { ideaId, content, deadlineComment } = req.body
      const resultValidate = validate(req.body)
      if (resultValidate.error) {
        if (listFile.length !== 0) {
          listFile.forEach(element => {
            unlinkFile(directoryFile + element)
          })
        }
        return apiResponse.response_status(res, resultValidate.error.message, 400)
      }
      const valueDeadlineComment = new Date(deadlineComment).getTime()
      const now = new Date().getTime()
      if (valueDeadlineComment > now) {
        if (listFile.length !== 0) {
          listFile.forEach(element => {
            unlinkFile(directoryFile + element)
          })
        }
        return apiResponse.response_status(res, Languages.EVENT_EXPIRED, 400)
      }
      const idea = await Ideas.findOne({ id: ideaId })
      console.log(idea)
      if (!idea) {
        return apiResponse.response_status(res, Languages.IDEA_NOT_FOUND, 400)
      }
      if (listFile.length > 0) {
        const fileId = await getNextSequenceValue('fileId')
        const fileResult = await Files.create({ id: fileId, file: listFile })
        const id = await getNextSequenceValue('commentId')
        const comment = await new Comment({ idea: idea._doc._id, id, user: _userId, content, file: fileResult._doc._id }).save()
        await Ideas.findOneAndUpdate({ id: ideaId }, { $inc: { totalComment: 1 }, $push: { comment: comment._id } },
          { new: true })
      } else {
        const id = await getNextSequenceValue('commentId')
        const comment = await new Comment({ idea: idea._doc._id, id, user: _userId, content }).save()
        await Ideas.findOneAndUpdate({ id: ideaId }, { $inc: { totalComment: 1 }, $push: { comment: comment._id } },
          { new: true })
      }
      return apiResponse.response_status(res, Languages.CREATE_COMMENT_SUCCESS, 200)
    } catch (error) {
      if (listFile.length !== 0) {
        listFile.forEach(element => {
          unlinkFile(directoryFile + element)
        })
      }
      return apiResponse.response_error_500(res, error.message)
    }
  },
  async listComment (req, res) {
    try {
      const ideaId = parseInt(req.query.ideaId)
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 5
      const skip = (limit * page) - limit
      const comments = await Comment.aggregate([
        {
          $match: { ideaId }

        },
        {
          $lookup: {
            from: 'commentreplies',
            localField: 'id',
            foreignField: 'commentId',
            as: 'commentReply'
          }
        },
        {
          $lookup: {
            from: 'files',
            localField: 'file',
            foreignField: 'id',
            as: 'files'
          }
        },
        { $unwind: '$file' },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: 'userId',
            as: 'user'
          }
        },
        { $unwind: '$user' },
        {
          $lookup: {
            from: 'users',
            localField: 'userReplyId',
            foreignField: 'userId',
            as: 'userReply'
          }
        },
        {
          $unwind: { path: '$userReply', preserveNullAndEmptyArrays: true }
        },
        {
          $project: {
            _id: 0,
            id: 1,
            content: 1,
            totalReply: 1,
            isEdited: 1,
            createdAt: 1,
            updatedAt: 1,
            files: {
              $map: {
                input: '$files',
                as: 'file',
                in: {
                  fileId: '$$file.id',
                  urls: {
                    $map: {
                      input: '$$file.file',
                      as: 'filename',
                      in: {
                        $concat: [BASEURL_FILE, '$$filename']
                      }
                    }
                  }
                }
              }
            },
            'user.userId': 1,
            'user.email': 1,
            'user.fullName': 1
          }
        }, { $skip: skip }, { $limit: limit }, { $sort: { createdAt: -1 } }
      ])
      const listComment = comments.map(comment => {
        const commentTime = new Date(comment.createdAt)
        const diffMinutes = moment().diff(commentTime, 'minutes')
        const time = timeComment(diffMinutes)
        return {
          id: comment.id,
          content: comment.content,
          createdAt: comment.createAt,
          totalReply: comment.totalReply,
          isEdited: comment.isEdited,
          user: comment.user,
          files: comment.files,
          timeAgo: time

        }
      })
      const totalComment = await Comment.find({ ideaId }).lean().countDocuments()
      return apiResponse.response_data(res, Languages.SUCCESSFUL, 200, {
        listComment,
        totalComment
      })
    } catch (error) {
      return apiResponse.response_error_500(res, error.message)
    }
  },
  async updateComment (req, res) {
    try {
      const { content } = req.body
      const id = req.params.id
      const userId = req.userId

      const commentIsMyself = await Comment.findOne({ id, userId })
      if (commentIsMyself == null) {
        return apiResponse.response_status(res, Languages.COMMENT_NOT_YOUSELF, 400)
      }
      await Comment.findOneAndUpdate(id, { content })
      return apiResponse.response_status(res, Languages.UPDATE_COMMENT_SUCCESS, 200)
    } catch (error) {
      return apiResponse.response_error_500(res, error.message)
    }
  },
  async deleteComment (req, res) {
    try {
      const userId = req.userId
      const commentId = req.params.id
      const commentIsMyself = await Comment.findOne({ id: commentId, userId })
      if (commentIsMyself == null) {
        return apiResponse.response_status(res, Languages.COMMENT_NOT_YOUSELF, 400)
      }
      await Comment.findOneAndDelete({ id: commentId, userId })
      await Ideas.findOneAndUpdate({ id: commentId }, { $inc: { totalComment: -1 } },
        { new: true })
      return apiResponse.response_status(res, Languages.UPDATE_COMMENT_SUCCESS, 200)
    } catch (error) {
      return apiResponse.response_error_500(res, error.message)
    }
  },
  async likeComment (req, res) {
    try {
      const userId = req.userId
      const commentId = req.params.id
      const comment = await Comment.findOne({ id: commentId })
      if (comment == null) {
        return apiResponse.response_status(res, Languages.IDEA_NOT_FOUND, 400)
      }
      if (comment.likes.includes(userId)) {
        removeElement(comment.likes, userId)
        comment.totalLike -= 1
        await comment.save()
        return apiResponse.response_status(res, Languages.UNLIKE_COMMENT_SUCCESSFULL, 200)
      }
      comment.likes.push(userId)
      comment.totalLike += 1
      await comment.save()
      return apiResponse.response_status(res, Languages.LIKE_COMMENT_SUCCESSFULL, 200)
    } catch (error) {
      return apiResponse.response_error_500(res, error.message)
    }
  }
}
