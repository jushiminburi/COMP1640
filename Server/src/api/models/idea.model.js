const mongoose = require('mongoose')
const Joi = require('joi')

const IdeasSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true, minlength: 3, maxlength: 150 },
  content: { type: String, required: true },
  anonymous: { type: Boolean, default: false },
  file: { type: String, ref: 'File' },
  event: { type: String, ref: 'Event' },
  category: { type: String, ref: 'Category' },
  user: { type: String, ref: 'User' },
  likes: [{ type: String, ref: 'User' }],
  dislikes: [{ type: String, ref: 'User' }],
  comment: [{ type: String, ref: 'Comment' }],
  totalLike: { type: Number, default: 0 },
  department: { type: String, ref: 'Department' },
  totalDislike: { type: Number, default: 0 },
  totalComment: { type: Number, default: 0 },
  totalViews: { type: Number, default: 0 }
}, { timestamps: true })

IdeasSchema.virtual('popular', function () {
  return this.totalComment + this.totalViews
})

function validateIdeas (idea) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(100).required(),
    content: Joi.string().min(6).max(255).required(),
    categoryId: Joi.number().min(1).max(50).required(),
    anonymous: Joi.bool().required(),
    eventId: Joi.number().min(1).max(50).required()
  })
  return schema.validate(idea)
}
const Ideas = mongoose.model('Ideas', IdeasSchema)

exports.Ideas = Ideas
exports.validate = validateIdeas
