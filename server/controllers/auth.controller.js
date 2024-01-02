const bcrypt = require('bcrypt');

const Role = require('../models/roles.model');
const User = require('../models/users.model');
const {createAccessToken} = require('../utils/jwt');

const saltRounds = 10;

async function signUp(req, res) {
    try {
        let {name, lastName, email, password} = req.body

        const roleName = 'student'
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const roleId = await Role.findOne({'name': roleName}).select('_id');

        const newUser = new User({
            name: name,
            lastName: lastName,
            email: email.toLowerCase(),
            password: hashedPassword,
            role: roleId,
        });

        await newUser.save();

        res.status(201).json({
            message: `Welcome ${newUser.name}`,
        });

    } catch (err) {
        if (err.code === 11000) {
            res.status(409).json({message: 'Email already exist'})
        } else {
            res.status(400).json({message: err.message});
        }
    }
}

async function login(req, res) {

    const { email, password} = req.body

    try {
        const user = await User.findOne({email: email.toLowerCase()});

        if (!user) {
            return res.status(401).json({message: 'Invalid email or password'});
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (validPassword) {

           const token = await createAccessToken({
                userId: user._id
            })


            res.cookie('token', token, {
                httpOnly: true,
                secure: false
            })

            res.status(200).json({message: 'Logged in successfully'});

        } else {
            res.status(401).json({message: 'Invalid email or password'});
        }
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

function logout(req, res){
    res.cookie('token', '')
    res.sendStatus(200)
}

module.exports = {
    signUp,
    login,
    logout
}