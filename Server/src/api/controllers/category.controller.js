const { Category, validate } = require('../models/category.model')
const apiResponse = require('../helpers/api.response.helper')
const Languages = require('../utils/languages')
const getNextSequenceValue = require('../utils/icrement.db')

module.exports = {
  async createCategory (req, res) {
    try {
      const { name } = req.body
      const result = validate(req.body)
      if (result.error) {
        return apiResponse.response_status(res, result.error.message, 400)
      }
      const category = await Category.findOne({ name })
      if (category) {
        return apiResponse.response_status(res, Languages.CATEGORY_EXSITS, 400)
      }
      const id = await getNextSequenceValue('categoryId')
      const newCategory = new Category({ name, id })
      await newCategory.save()
      return apiResponse.response_status(res, Languages.CATEGORY_SUCCESS, 200)
    } catch (error) {
      return apiResponse.response_error_500(res, error.message)
    }
  },
  async getListCategory (req, res) {
    try {
      const list = await Category.find({}, { _id: 0, __v: 0 })
      if (list.error) {
        return apiResponse.response_status(res, list.error.message, 400)
      }
      return apiResponse.response_data(res, Languages.SUCCESSFUL, 200, list)
    } catch (error) {
      return apiResponse.response_error_500(res, error.message)
    }
  },
  async deleteCategory (req, res) {
    try {
      const id = req.params.id
      const category = await Category.findOneAndDelete({ id })
      if (!category) {
        return apiResponse.response_status(res, Languages.CATEGORY_NOT_EXSITS, 400)
      }
      return apiResponse.response_status(res, Languages.CATEGORY_DELETE_SUCCESS, 200)
    } catch (error) {
      return apiResponse.response_error_500(res, error.message)
    }
  }
}
