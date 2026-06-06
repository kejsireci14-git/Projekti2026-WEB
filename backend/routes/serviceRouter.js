const express = require('express');
const router = express.Router();
// Importing the service controller
const {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');
// Importing the protect middleware to secure routes that require authentication
const { protect, adminOnly } = require('../middlewares/authMiddleware');

// @route   GET /api/services
// @desc    Get all services
// @access  Public
router.get('/', getServices);

// @route   GET /api/services/:id
// @desc    Get a single service
// @access  Public
router.get('/:id', getService);

// @route   POST /api/services
// @desc    Create a new service
// @access  Private/Admin
router.post('/', protect, adminOnly, createService);

// @route   PUT /api/services/:id
// @desc    Update a service
// @access  Private/Admin
router.put('/:id', protect, adminOnly, updateService);

// @route   DELETE /api/services/:id
// @desc    Delete a service
// @access  Private/Admin
router.delete('/:id', protect, adminOnly, deleteService);

module.exports = router;
