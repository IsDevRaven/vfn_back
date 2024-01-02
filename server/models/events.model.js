const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    eventType: {
        type: String,
        enum: ['CP', 'Course'],
        required: true
    },
    limitStudents: Number,
    repeat: {
        frequency: {
            type: String,
            enum: ['Daily', 'Weekly', 'Monthly', 'Yearly', 'Once']
        },
        instances: [{
            day: String,
            endDate: Date,
            finished: Boolean
        }]
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event
