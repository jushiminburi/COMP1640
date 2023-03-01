const apiResponse = require('../helpers/api.response.helper')
const Languages = require('../utils/languages')
const fs = require('fs')
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

module.exports = {
  async createIdea (req, res) {
    const directoryFile = path.join(__dirname, '../../../upload/idea/')
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
        await Files.create({ id: fileId, ideaId: id, file: listFile })
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
          $project: {
            _id: 0,
            id: 1,
            title: 1,
            content: 1,
            anonymous: 1,
            categoryId: 1,
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
  }
}
