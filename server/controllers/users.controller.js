const jwt = require('jsonwebtoken');
const User = require('../models/users.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

async function getUserById(req, res, next) {
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({message: 'Cannot find user'});
        }
        res.user = user;
        next();
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

async function createUser(req, res) {
    try {
        const email = req.body.email.toLowerCase();
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const newUser = new User({
            name: req.body.name,
            lastName: req.body.lastName,
            email: email,
            password: hashedPassword,
            role: req.body.role,
        });

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            lastName: newUser.lastName,
            email: newUser.email,
            role: newUser.role
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
                { userId: user._id, email: user.email, role: user.role },
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
    loginUser
};
