const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        immutable: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    staus: {
        type: String,
        enum: ['blocked', 'unblocked']
    }
});

module.exports = employeeSchema;