const Role = require('../models/roles.model')
const User = require("../models/users.model");


async function getAllRoles(req, res) {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

async function getRoleByName(req, res, next) {
    try {
        const role = await Role.findOne({ name: req.params.roleName})

        if (!role) {
            return res.status(404).json({message: 'Cannot find role'});s
        }
        res.role = role
        next()

    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}
async function createRol(req, res) {
    try {
        const newRole = new Role({
            name: req.body.name,
            permissions: req.body.permissions,
        });

        await newRole.save();

        res.status(201).json({
            _id: newRole._id,
            name: newRole.name,
            permissions: newRole.permissions
        });
    } catch (err) {
        if (err.code === 11000) {
            res.status(409).json({message: 'The role already exist'})
        } else {
            res.status(400).json({message: err.message});
        }
    }
}

async function updateRole(req, res) {
    Object.assign(res.role, req.body);

    try {
        const updatedRole = await res.role.save();
        res.status(200).json(updatedRole);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

module.exports = {
    createRol,
    getAllRoles,
    getRoleByName,
    updateRole
}