const mongoose = require('mongoose')

const File = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  file: { type: [String] },
  idea: { type: String, ref: 'Ideas' }
}, { timestamps: true })

const Files = mongoose.model('File', File)
module.exports = Files
