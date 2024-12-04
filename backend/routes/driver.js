const express = require('express');
const registerDriver = require('../controllers/driver');
const router = express.Router();

router.post('/register', registerDriver)

module.exports = router