const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller')
const {authenticateToken} = require('../middleware/auth')

router.post('/signup', authController.signUp)
router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.get('/profile', authenticateToken, (req, res) => {
    res.status(200).json(req.user)
})

module.exports = router;