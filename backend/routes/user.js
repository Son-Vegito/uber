const express = require('express');
const { registerUser, loginUser, getUserProfile, logoutUser } = require('../controllers/user');
const authUser = require('../middlewares/auth');
const router = express.Router();


router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', authUser, getUserProfile)
router.get('/logout', logoutUser)

module.exports = router