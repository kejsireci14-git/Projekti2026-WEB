const express = require('express');
const router = express.Router();

const {
  getStaff,
  getStaffMember,
  createStaff,
  updateStaff,
  deleteStaff,
} = require('../controllers/staffController');

const { protect, adminOnly } = require('../middlewares/authMiddleware');
router.get('/', getStaff);

router.get('/:id', getStaffMember);

router.post('/', protect, adminOnly, createStaff);

router.put('/:id', protect, adminOnly, updateStaff);

router.delete('/:id', protect, adminOnly, deleteStaff);

module.exports = router;
