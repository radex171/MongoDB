const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstName: { type: String, require: true},
    lastName: { type: String, require: true},
    department: {type: String, required: true, ref: 'Department'}
});

module.exports = mongoose.model('Employee', employeeSchema);