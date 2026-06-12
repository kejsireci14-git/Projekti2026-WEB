const express = require('express');
const router = express.Router();

const {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require('../controllers/appointmentController');

const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, getAppointments);


router.get('/:id', protect, getAppointment);


router.post('/', protect, createAppointment);


router.put('/:id', protect, updateAppointment);

router.delete('/:id', protect, deleteAppointment);

module.exports = router;
