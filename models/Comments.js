const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  publisherusername: { type: String, required: true },
  publishername: { type: String, required: true },
  publisherImageid: { type: String, required: true },
  publisherid: { type: String, required: true },
  body: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
