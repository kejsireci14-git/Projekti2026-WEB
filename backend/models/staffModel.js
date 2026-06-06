const mongoose = require('mongoose');

const staffSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
    },
    specializations: {
      type: [String],
    },
    bio: {
      type: String,
    },
    photo: {
      type: String,
      default: '',
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    workingDays: {
      type: [String],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Staff', staffSchema);
