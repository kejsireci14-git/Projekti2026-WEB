const express = require('express');
const router = express.Router();
// Importing the appointment controller
const {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require('../controllers/appointmentController');
// Importing the protect middleware to secure routes that require authentication
const { protect } = require('../middlewares/authMiddleware');

// @route   GET /api/appointments
// @desc    Get all appointments
// @access  Private
router.get('/', protect, getAppointments);

// @route   GET /api/appointments/:id
// @desc    Get a single appointment
// @access  Private
router.get('/:id', protect, getAppointment);

// @route   POST /api/appointments
// @desc    Create a new appointment
// @access  Private
router.post('/', protect, createAppointment);

// @route   PUT /api/appointments/:id
// @desc    Update an appointment
// @access  Private
router.put('/:id', protect, updateAppointment);

// @route   DELETE /api/appointments/:id
// @desc    Delete an appointment
// @access  Private
router.delete('/:id', protect, deleteAppointment);

module.exports = router;
