const mongoose = require('mongoose');
const appointmentSchema = mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Client is required'],
      ref: 'User',
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Service is required'],
      ref: 'Service',
    },
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Staff is required'],
      ref: 'Staff',
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    timeSlot: {
      type: String,
      required: [true, 'Time slot is required'],
    },
    status: {
      type: String,
      default: 'pending',
    },
    notes: {
      type: String,
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model('Appointment', appointmentSchema);
