const express = require('express');
const router = express.Router();
// Importing the staff controller
const {
  getStaff,
  getStaffMember,
  createStaff,
  updateStaff,
  deleteStaff,
} = require('../controllers/staffController');
// Importing the protect middleware to secure routes that require authentication
const { protect, adminOnly } = require('../middlewares/authMiddleware');

// @route   GET /api/staff
// @desc    Get all staff members
// @access  Public
router.get('/', getStaff);

// @route   GET /api/staff/:id
// @desc    Get a single staff member
// @access  Public
router.get('/:id', getStaffMember);

// @route   POST /api/staff
// @desc    Create a new staff member
// @access  Private/Admin
router.post('/', protect, adminOnly, createStaff);

// @route   PUT /api/staff/:id
// @desc    Update a staff member
// @access  Private/Admin
router.put('/:id', protect, adminOnly, updateStaff);

// @route   DELETE /api/staff/:id
// @desc    Delete a staff member
// @access  Private/Admin
router.delete('/:id', protect, adminOnly, deleteStaff);

module.exports = router;
