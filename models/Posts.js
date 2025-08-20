const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  publesherUsername: { type: String, required: true },
  publeshername: { type: String, required: true },
  publesherImageId: { type: Number, required: true },
  body: { type: String, default: '' },
  viwes: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  comments: { type: [String], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
