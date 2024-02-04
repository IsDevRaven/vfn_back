const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')
const {authenticateToken} = require('../middleware/auth')

router.get('/profile', authenticateToken, userController.getUser)

module.exports = router;