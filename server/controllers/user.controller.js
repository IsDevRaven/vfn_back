const User = require('../models/users.model');

async function getUser(req, res) {
    res.status(200).json(req.user)
    console.log(req.user)
}

module.exports = {
    getUser
}