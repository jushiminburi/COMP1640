const mongoose = require('mongoose')
const Joi = require('joi')

const Comment = mongoose.model('Comment', new mongoose.Schema({
  id: { type: Number, required: true },
  idea: { type: String, ref: 'Ideas' },
  content: { type: String, maxlength: 10000, required: true },
  file: { type: String, ref: 'File' },
  user: { type: String, ref: 'User' },
  isEdited: { type: Boolean, default: false },
  likes: [{ type: String, ref: 'User' }],
  totalLike: { type: Number, default: 0 },
  anonymous: { type: Boolean, default: false }
}, {
  timestamps: true
}))

function validateComment (comment) {
  const schema = Joi.object({
    ideaId: Joi.number().required(),
    content: Joi.string().min(2).max(1000).required(),
    commentId: Joi.number()
  })
  return schema.validate(comment)
}
exports.Comment = Comment
exports.validate = validateComment
