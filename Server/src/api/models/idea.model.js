const mongoose = require('mongoose')
const Joi = require('joi')

const Ideas = mongoose.model('Ideas', new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true, minlength: 3, maxlength: 150 },
  content: { type: String, required: true },
  anonymous: { type: Boolean, default: false },
  file: { type: [String] },
  categoryId: { type: Number, required: true },
  userId: { type: Number, required: true }
}, { timestamps: true }))

function validateIdeas (idea) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(100).required(),
    content: Joi.string().min(6).max(255).required(),
    categoryId: Joi.number().min(1).max(50).required(),
    anonymous: Joi.bool().required()
  })
  return schema.validate(idea)
}

exports.Ideas = Ideas
exports.validate = validateIdeas
