const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    permissions: [{
        type: String,
        enum: ['DELETE_USER', 'VIEW_ALL_USERS', 'UPDATE_USER', 'UPDATE_OWN_USER', 'VIEW_OWN_DATA', 'VIEW_OWN_STUDENTS', 'VIEW_OWN_TEACHER']
    }]
}, {
    timestamps: true
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;