const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      enum: ['client', 'admin'],
      default: 'client',
    },
    avatar: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model('User', userSchema);
