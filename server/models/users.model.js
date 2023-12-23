const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        description: "must be a string and is required"
    },
    lastName: {
        type: String,
        required: true,
        description: "must be a string and is required"
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^.+@.+\..+$/, "Please fill a valid email address"],
        description: "must be a string in the format of an email and is required",
    },
    password: {
        type: String,
        required: true,
        description: "must be a string and is required"
    },
    role: {
        type: String,
        required: true,
        enum: ['student', 'teacher'],
        description: "can only be one of 'student' or 'teacher'"
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
