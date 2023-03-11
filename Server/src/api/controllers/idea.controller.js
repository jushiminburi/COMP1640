const apiResponse = require('../helpers/api.response.helper')
const Languages = require('../utils/languages')
const fs = require('fs')
const Joi = require('joi')
const getNextSequenceValue = require('../utils/icrement.db')
const { Ideas, validate } = require('../models/idea.model')
const Files = require('../models/file.model')
const { Category } = require('../models/category.model')
const path = require('path')
const { BASEURL_FILE } = require('../utils/global')

function unlinkFile (file) {
  fs.unlink(file, function (err) {
    if (err) {
      console.log('Error deleting file:', err)
    } else {
      console.log(`File deleted successfully.${file}`)
    }
  })
}
function validateIdea (idea) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(100),
    content: Joi.string().min(6).max(255),
    anonymous: Joi.bool()
  })
  return schema.validate(idea)
}

module.exports = {
  async createIdea (req, res) {
    const directoryFile = path.join(__dirname, '../../../upload/')
    const listFile = req.listFile
    try {
      const { title, content, anonymous, categoryId, eventId } = req.body
      const userId = req.userId
      const resultValidate = validate(req.body)
      if (resultValidate.error) {
        if (listFile.length !== 0) {
          listFile.forEach(element => {
            unlinkFile(directoryFile + element)
          })
        }
        return apiResponse.response_status(res, resultValidate.error.message, 400)
      }
      const categoryValue = await Category.findOne({ id: categoryId })
      if (!categoryValue) {
        if (listFile.length !== 0) {
          listFile.forEach(element => {
            unlinkFile(directoryFile + element)
          })
        }
        return apiResponse.response_status(res, Languages.CATEGORY_NOT_EXSITS, 400)
      }
      const valueStartDate = new Date(categoryValue.startDate).getTime()
      const now = new Date().getTime()
      if (valueStartDate > now) {
        return apiResponse.response_status(res, Languages.CATEGORY_EXPIRED, 400)
      }
      const id = await getNextSequenceValue('ideaId')
      if (listFile.length > 0) {
        const fileId = await getNextSequenceValue('fileId')
        await Files.create({ id: fileId, file: listFile })
        await new Ideas({ id, userId, title, content, anonymous, categoryId, file: fileId, eventId }).save()
      } else { await new Ideas({ id, userId, title, content, anonymous, categoryId, eventId }).save() }
      return apiResponse.response_status(res, Languages.CREATE_IDEA_SUCCESS, 200)
    } catch (error) {
      if (listFile.length !== 0) {
        listFile.forEach(element => {
          unlinkFile(directoryFile + element)
        })
      }
      return apiResponse.response_error_500(res, error.message)
    }
  },
  async paginationListIdea (req, res) {
    try {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 5
      const skip = (limit * page) - limit
      const ideas = await Ideas.aggregate([
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
            from: 'comments',
            localField: 'id',
            foreignField: 'ideaId',
            as: 'comments'
          }
        },
        {
          $unwind: {
            path: '$comments',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: 'files',
            localField: 'comments.file',
            foreignField: 'id',
            as: 'comments.files'
          }
        },
        { $unwind: { path: '$comments.files', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: 'users',
            localField: 'comments.userId',
            foreignField: 'userId',
            as: 'comments.user'
          }
        },
        { $unwind: { path: '$comments.user', preserveNullAndEmptyArrays: true } },
        {
          $addFields: {
            comment: {
              $ifNull: [
                {
                  id: '$comments.id',
                  content: '$comments.content',
                  isEdited: '$comments.isEdited'
                },
                {}
              ]
            }
          }
        },
        {
          $sort: {
            'comments.createAt': -1
          }
        },
        {
          $group: {
            _id: '$_id',
            idea: { $first: '$$ROOT' },
            comment: { $first: '$comment' }
          }
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: ['$idea', { comment: '$comment' }]
            }
          }
        },
        {
          $project: {
            _id: 0,
            id: 1,
            title: 1,
            content: 1,
            anonymous: 1,
            categoryId: 1,
            createdAt: 1,
            comment: {
              id: '$comment.id',
              content: '$comment.content',
              isEdited: '$comment.isEdited',
              user: {
                userId: '$comment.user.userId',
                fullName: '$comment.user.fullName',
                email: '$comment.user.email'
              },
              files: {
                $map: {
                  input: '$comment.files',
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
              }
            },
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
            'user.username': 1,
            'user.userId': 1,
            'user.email': 1,
            'user.fullName': 1
          }
        }, { $skip: skip }, { $limit: limit }
      ]
      )
      const totalIdea = await Ideas.find().countDocuments()
      return apiResponse.response_data(res, Languages.SUCCESSFUL, 200, {
        ideas,
        totalIdea
      })
    } catch (error) {
      return apiResponse.response_error_500(res, error.message)
    }
  },
  async updateIdea (req, res) {
    try {
      const ideaId = req.params.id
      const userId = req.userId
      const { title, content, anonymous } = req.body
      const validate = validateIdea(req.body)
      if (validate.error) {
        return apiResponse.response_status(res, validate.error.message, 400)
      }
      const idea = await Ideas.findOneAndUpdate({ id: ideaId, userId }, { title, content, anonymous })
      if (idea == null) {
        return apiResponse.response_status(res, Languages.IDEA_NOT_FOUND, 400)
      }
      return apiResponse.response_status(res, Languages.SUCCESSFUL, 200)
    } catch (error) {
      return apiResponse.response_error_500(res, error.message)
    }
  },
  async deleteIdea (req, res) {
    try {
      const ideaId = req.params.id
      const userId = req.userId
      const idea = await Ideas.findOneAndDelete({ id: ideaId, userId })
      if (idea == null) {
        return apiResponse.response_status(res, Languages.IDEA_NOT_FOUND, 400)
      }
      return apiResponse.response_status(res, Languages.SUCCESSFUL, 200)
    } catch (error) {
      return apiResponse.response_error_500(res, error.message)
    }
  }
}
