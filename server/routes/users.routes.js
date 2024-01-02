const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const rolesController = require('../controllers/roles.controller')
const {authenticateToken, checkPermission} = require('../middleware/auth')

// Role
router.get('/role', rolesController.getAllRoles)
router.get('/role/:roleName', rolesController.getRoleByName, (req, res) => res.json(res.role));
router.post('/role', rolesController.createRol)
router.patch('/role/:roleName', rolesController.getRoleByName, rolesController.updateRole)

// Student
router.get('/student', authenticateToken, checkPermission('VIEW_ALL_USERS'), usersController.getAllStudents)

// Teacher
router.get('/teacher', usersController.getAllTeachers)
router.patch('/teacher/student', usersController.assignStudentsByEmail);


router.post('/', usersController.createUser);
router.post('/login', usersController.loginUser);
router.get('/', authenticateToken, checkPermission('VIEW_ALL_USERS'), usersController.getAllUsers);
router.get('/:id', usersController.getUserById, (req, res) => res.json(res.user));
router.patch('/:id', usersController.getUserById, usersController.updateUser);


module.exports = router;