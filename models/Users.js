const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true , maxlength: 20,unique: true,match: [/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores (no spaces)"],minlength: 5,},
  name: { type: String,maxlength: 48, required: true },
  password: { type: String,maxlength: 20, default: '' },
  profileImage: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  helike: { type: [String], default: [] },
  helikeposts: { type: [String], default: [] },
  posts:{ type: [String], default: [] },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
