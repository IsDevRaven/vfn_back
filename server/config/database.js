// server/database.js

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Server connected to DB')
    } catch (err) {
        throw err
    }
};

module.exports = connectDB;
