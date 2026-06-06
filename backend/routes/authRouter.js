const express = require('express');
const router = express.Router();
// Importing the user controller
const {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfile,
} = require('../controllers/userController');
// Importing the protect middleware to secure routes that require authentication
const { protect } = require('../middlewares/authMiddleware');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Authenticate a user and get a token
// @access  Public
router.post('/login', loginUser);

// @route   GET /api/auth/me
// @desc    Get the current logged in user
// @access  Private
router.get('/me', protect, getCurrentUser);

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, updateProfile);

module.exports = router;
