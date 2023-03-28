const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const employeeSchema = require('../schemas/employeeSchema');
const Employee = new mongoose.model('Employee', employeeSchema);

// post an employee
router.post('/', async (req, res) => {
    const newEmployee = new Employee(req.body);
    await newEmployee.save(req.body);
    try {
        res.status(200).json({
            message: "Employee was inserted successfully!"
        })
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!"
        })
    };
});

// post multiple employees
router.post('/all', async (req, res) => {
    await Employee.insertMany(req.body);
    try {
        res.status(200).json({
            message: "Employees were inserted successfully!"
        })
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!"
        })
    };
});

// get all the employees
router.get('/all', async (req, res) => {
    const allEmployees = await Employee.find({});
    const modified = allEmployees.map((
        {
            _id, firstName, lastName, email, phoneNumber, isBlocked }) => (
        {
            _id, fullName: firstName + ' ' + lastName, email, phoneNumber, isBlocked
        }));
    try {
        res.send(modified)
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!"
        })
    };
});

// get an employee by id
router.get('/:id', async (req, res) => {
    const employee = await Employee.findOne({ _id: req.params.id });
    try {
        res.status(200).json({
            _id: employee._id,
            fullName: employee.fullName,
            email: employee.email,
            phoneNumber: employee.phoneNumber,
            isBlocked: employee.isBlocked
        })
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!"
        })
    };
});

// update an employee
router.put('/:id', async (req, res) => {
    await Employee.findByIdAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                isBlocked: req.body.isBlocked
            }
        },
        { new: true, useFindAndModify: false });
    try {
        res.status(200).json({
            message: "Employee was updated successfully!"
        })
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!"
        })
    };
});

// check if blocked
router.get('/isBlocked/:id', async (req, res) => {
    const employee = await Employee.findOne({ _id: req.params.id });
    try {
        res.send(employee.isBlocked)
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!"
        })
    };
});

// delete an employee
router.delete('/:id', async (req, res) => {
    await Employee.deleteOne({ _id: req.params.id });
    try {
        res.status(200).json({
            message: "Employee was deleted successfully!"
        })
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!"
        })
    };
});

module.exports = router;