const apiResponse = require('../helpers/api.response.helper')
const { User } = require('../models/user.model')
const Languages = require('../utils/languages')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const { BASEURL_AVATAR } = require('../utils/global')
const { BASEURL_FILE } = require('../utils/global')
const checkFile = require('../utils/utils')
require('dotenv').config()

function validateUser (user) {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).email(),
    firstName: Joi.string().min(1).max(50).pattern(/^[a-zA-Z]{2,30}/),
    lastName: Joi.string().min(1).max(50).pattern(/^[a-zA-Z]{2,30}/),
    pasword: Joi.string().min(1).max(50).pattern(/^[a-zA-Z]{6,232}/),
    department: Joi.string().min(1).max(30),
    role: Joi.number().max(5).min(1)
  })
  return schema.validate(user)
}
module.exports = {
  async changePassword  (req, res) {
    try {
      const { userId, password } = req.body
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)
      const changePassword = await User.findOneAndUpdate(userId, { password: hashPassword }, { new: false })
      console.log(changePassword)
      if (changePassword) {
        return apiResponse.response_status(res, Languages.CHANGE_PASSWORD_SUCCESS, 200)
      } else {
        return apiResponse.response_status(res, Languages.CHANGE_PASSWORD_FAIL, 404)
      }
    } catch (error) {
      return apiResponse.response_error_500(res, error.message)
    }
  },
  async updateUser (req, res) {
    try {
      const id = req.params.id
      const { email, lastName, firstName, department, isActive, role } = req.body
      const result = validateUser(req.body)
      if (result.error) {
        return apiResponse.response_status(res, result.error.message, 400)
      }
      const updateUser = await User.findOneAndUpdate({ userId: id }, { email, lastName, firstName, department, isActive, role }, { new: false })
      console.log(updateUser)
      if (updateUser) {
        return apiResponse.response_status(res, Languages.UPDATE_USER_SUCCESSFUL, 200)
      } else {
        return apiResponse.response_status(res, Languages.ACCOUNT_NOT_EXISTS, 404)
      }
    } catch (error) {
      return apiResponse.response_error_500(res, error.message)
    }
  },
  async updateProfileUser (req, res) {
    const listFile = req.listFile
    try {
      const id = req.params.id
      const userId = req.userId
      const { lastName, firstName, password } = req.body
      const result = validateUser(req.body)
      if (result.error) {
        return apiResponse.response_status(res, result.error.message, 400)
      }
      if (listFile.length > 0) {
        if (listFile.length !== 1) {
          checkFile(listFile, res)
        } else {
          return apiResponse.response_status(res, Languages.UPLOAD_AVATAR_FAIL, 400)
        }
      }
      if (parseInt(id) !== userId) {
        return apiResponse.response_status(res, Languages.USER_NOT_YOURSELF, 400)
      }
      if (password !== undefined) {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const passwordDB = await User.findOne({ userId: id }, 'password')
        console.log(passwordDB)
        const changePassword = await User.findOneAndUpdate(userId, { password: hashPassword }, { new: false })
        if (changePassword) {
          return apiResponse.response_status(res, Languages.CHANGE_PASSWORD_SUCCESS, 200)
        } else {
          return apiResponse.response_status(res, Languages.CHANGE_PASSWORD_FAIL, 404)
        }
      }
      let updateUser
      if (listFile.length > 0) {
        updateUser = await User.findOneAndUpdate({ userId: id }, { lastName, firstName, avatar: listFile[0] }, { new: false })
      } else {
        updateUser = await User.findOneAndUpdate({ userId: id }, { lastName, firstName, avatar: listFile[0] }, { new: false })
      }
      if (updateUser) {
        return apiResponse.response_status(res, Languages.UPDATE_USER_SUCCESSFUL, 200)
      } else {
        return apiResponse.response_status(res, Languages.ACCOUNT_NOT_EXISTS, 404)
      }
    } catch (error) {
      return apiResponse.response_error_500(res, error.message)
    }
  },
  async deleteUser (req, res) {
    try {
      const id = req.params.id
      const deleteUser = await User.findOneAndDelete({ userId: id })
      console.log(deleteUser)
      if (deleteUser) {
        return apiResponse.response_status(res, Languages.DELETE_USER_SUCCESSFUL, 200)
      }
      return apiResponse.response_status(res, Languages.DELETE_USER_FAIL, 400)
    } catch (error) {
      return apiResponse.response_error_500(res, error.message)
    }
  },
  async getListUser (req, res) {
    try {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 5
      // const keyword = req.query.keyword
      const skip = (limit * page) - limit
      const list = await User.find({}, { _id: 0, password: 0, __v: 0 }).skip(skip).limit(limit)
      const listUser = list.map(user => {
        return {
          ...user._doc,
          avatar: `${BASEURL_AVATAR}${user.avatar}`
        }
      })
      const totalUser = await User.find().countDocuments()
      const response = apiResponse.response_data(res, Languages.SUCCESSFUL, 200, {
        listUser,
        totalUser
      })
      return response
    } catch (error) {
      return apiResponse.response_error_500(res, error.message)
    }
  },
  async getUserById (req, res) {
    try {
      const id = req.params.id
      const user = await User.findOne({ userId: id }, { _id: 0, __v: 0, idea: 0, password: 0 }).populate({
        path: 'department',
        select: 'id name -_id'
      })
      user.avatar = BASEURL_FILE + user.avatar
      if (user == null) {
        return apiResponse.response_status(res, Languages.USER_NOT_FOUND, 400)
      }
      return apiResponse.response_data(res, Languages.SUCCESSFUL, 200, user)
    } catch (error) {
      return apiResponse.response_error_500(res, error.message)
    }
  }
}
