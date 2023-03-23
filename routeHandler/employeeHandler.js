const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const employeeSchema = require('../schemas/employeeSchema');
const Employee = new mongoose.model('Employee', employeeSchema);

// post an employee
router.post('/', async (req, res) => {
    await Employee.save(req.body);
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
router.get('/', async (req, res) => {
    await Employee.find({});
    try {
        res.status(200).json({
            message: "Employees were found successfully!"
        })
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!"
        })
    };
});

// get an employee by id
router.get('/:id', async (req, res) => {
    await Employee.find({ _id: req.params.id });
    try {
        res.status(200).json({
            message: "Employee was found successfully!"
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
        { status: 'unblocked' },
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

// delete an employee
router.delete('/:id', async (req, res) => {
    await Employee.delete({ _id: req.params.id });
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