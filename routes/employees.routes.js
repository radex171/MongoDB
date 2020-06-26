const express = require('express');
const router = express.Router();
const Employee = require('../models/employee.model');

router.get('/employees', async (req, res) => {
 
  try {
    res.json(await Employee.find());
  }

  catch (err) {
    res.status(500).json({message: err});
  }
});

router.get('/employees/random', async (req, res) => {

  try{
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const employee = await Employee.findOne().skip(rand);

    if(!employee) res.status(404).json({message: 'Not found!'});

    else res.json(employee)
  }

  catch(err) {
    res.status(500).json({message: err});
  }
  });

router.get('/employees/:id', async (req, res) => {

  try {

    const employee = await Employee.findById(req.params.id);
    if(!employee) res.status(404).json({message: 'Sorry, not found employee with id: ' + (req.params.id)})
    
    else res.json({message: employee });
  }

  catch(err) {
    res.status(500).json({message: err});
  }
});

router.post('/employees', async (req, res) => {
 
  const { firstName, lastName } = req.body;
 
  try {
    const newEmployee = new Employee({firstName: firstName, lastName: lastName});
    await newEmployee.save();
    res.json({message: 'Add new employee: ', newEmployee});
  }

  catch(err) {
    res.status(500).json({message: err});
  }
});

router.put('/employees/:id', async (req, res) => {
  const { firstName, lastName } = req.body;
  
  try {

    const employee = await(Employee.findById(req.params.id));
    
    if(employee) {
      
      await Employee.updateOne({_id: req.params.id}, {$set: {firstName: firstName, lastName: lastName}});
      res.json({message: 'change: ', employee})
    }

    else res.status(404).json({message: 'Sorry, not found:' + (req.params.id)});
  }
  
  catch(err) {
    res.status(500).json({message: err});
  }
});

router.delete('/employees/:id', async (req, res) => {
  
  try {
    const employee = await(Employee.findById(req.params.id));

    if (employee) {

      await Employee.deleteOne({_id: req.params.id});
      res.json({ message: 'Delete:', employee});
    }
    
    else res.status(404).json({message: 'sorry, not found id: ' + (req.params.id)})
  }

  catch(err) {
    res.status(500).json({message: err});
  }
});
module.exports = router;
