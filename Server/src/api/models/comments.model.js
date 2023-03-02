const mongoose = require('mongoose')
const Joi = require('joi')

const Comment = mongoose.model('Comment', new mongoose.Schema({
  id: { type: Number, required: true },
  ideaId: { type: Number, required: true },
  commentParentId: { type: Number },
  content: { type: String, maxlength: 10000, required: true },
  anonymous: { type: Boolean, default: false },
  file: { type: Number, default: 0, required: true },
  totalReply : { type: Number, default: 0}
},{
  timestamps: true
}))

function validateComment (comment) {
  const schema = Joi.object({
  content: Joi.string().min(2).max(1000).required(),
  anonymous: Joi.bool().required(),
  })
  return schema.validate(comment)
}
exports.Comment = Comment
exports.validate = validateComment
