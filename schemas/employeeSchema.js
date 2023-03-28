const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
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
    isBlocked: {
        type: Boolean,
        default: false
    }
});

employeeSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
});

module.exports = employeeSchema;