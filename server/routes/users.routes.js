// routes/users.routes.js

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const {authenticateToken, checkRole, checkSelf} = require('../middleware/auth')

router.post('/', usersController.createUser);
router.post('/login', usersController.loginUser);
router.get('/', authenticateToken, checkRole('teacher'), usersController.getAllUsers);
router.get('/:id', authenticateToken, checkSelf, usersController.getUserById, (req, res) => res.json(res.user));
router.patch('/:id', authenticateToken, checkSelf, usersController.getUserById, usersController.updateUser);

module.exports = router;