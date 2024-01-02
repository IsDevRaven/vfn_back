const jwt = require('jsonwebtoken');
const User = require('../models/users.model');
const Role = require('../models/roles.model'); // Asegúrate de que la ruta sea correcta

const bcrypt = require('bcrypt');
const saltRounds = 10;
async function getAllUsers(req, res) {
    try {
        const users = await User.find().select('-password').populate('roles');
        res.json(users);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

async function getUserById(req, res, next) {
    try {
        let user = await User.findById(req.params.id).select('-password').populate('roles');
        if (!user) {
            return res.status(404).json({message: 'Cannot find user'});
        }
        res.user = user;
        next();
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

async function getAllStudents(req, res){
    try {
        const studentRoleId = await Role.findOne({'name': 'student'});

        if (!studentRoleId) {
            return res.status(404).json({message: "Role student dont find"})
        }

        const students = await User.find({roles: {$in: [studentRoleId._id]}}).select('-password');
        res.json(students)
    } catch (err){
        res.status(500).json({ message: err.message})
    }
}

async function getAllTeachers(req, res){
    try {
        const teacherRoleId = await Role.findOne({'name': 'teacher'});

        if (!teacherRoleId) {
            return res.status(404).json({message: "Role teacher dont find"})
        }

        const teachers = await User.find({roles: {$in: [teacherRoleId._id]}}).select('-password');
        res.json(teachers)
    } catch (err){
        res.status(500).json({ message: err.message})
    }
}

async function assignStudentsByEmail(req, res) {
    try {
        const teacherEmail = req.body.teacherEmail;
        const studentEmails = req.body.studentEmails; // Asume que esto es una lista de correos electrónicos de estudiantes

        const teacher = await User.findOne(
            { email: teacherEmail}
        ).select('-password');

        if (!teacher) {
            return res.status(404).json({ message: 'Teacher dont find' });
        }

        const students = await User.find(
            { email: { $in: studentEmails }}
        ).select('-password');

        teacher.students = students.map(student => student._id);
        await teacher.save();

        res.status(200).json({ message: 'Estudiantes asignados correctamente' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function createUser(req, res) {
    try {
        const email = req.body.email.toLowerCase();
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        const roles = await Role.find({ 'name': { $in: req.body.roles } });
        const roleIds = roles.map(role => role._id);

        const newUser = new User({
            name: req.body.name,
            lastName: req.body.lastName,
            email: email,
            password: hashedPassword,
            roles: roleIds,
        });

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            lastName: newUser.lastName,
            email: newUser.email,
            roles: newUser.roles
        });
    } catch (err) {
        if (err.code === 11000) {
            res.status(409).json({message: 'Email already exist'})
        } else {
            res.status(400).json({message: err.message});
        }
    }
}

async function updateUser(req, res) {
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    }

    if (req.body.email) {
        req.body.email = req.body.email.toLowerCase()
    }

    if (req.body.roles) {
        const roles = await Role.find({ 'name': { $in: req.body.roles } });
        req.body.roles = roles.map(role => role._id);
    }

    Object.assign(res.user, req.body);

    try {
        const updatedUser = await res.user.save();
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

async function loginUser(req, res) {
    try {
        const email = req.body.email.toLowerCase()
        const user = await User.findOne({email: email});

        if (!user) {
            return res.status(401).json({message: 'Invalid email or password'});
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (validPassword) {

            const token = jwt.sign(
                { userId: user._id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.status(200).json({message: 'Logged in successfully', token: token});
        } else {
            res.status(401).json({message: 'Invalid email or password'});
        }
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}


module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    loginUser,
    getAllStudents,
    assignStudentsByEmail,
    getAllTeachers
};
