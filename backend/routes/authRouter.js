const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfile,
} = require('../controllers/userController');

const { protect } = require('../middlewares/authMiddleware');
router.post('/register', registerUser);


router.post('/login', loginUser);

router.get('/me', protect, getCurrentUser);


router.put('/profile', protect, updateProfile);

module.exports = router;
