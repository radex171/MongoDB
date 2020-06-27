
const Employee = require('../models/employee.model');

exports.getAll = async (req, res) => {
 
    try {
      res.json(await Employee.find().populate('department'));
    }
  
    catch (err) {
      res.status(500).json({message: err});
    }
  };
  
  exports.getRandom = async (req, res) => {
  
    try {
      const count = await Employee.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const employee = await Employee.findOne().populate('department').skip(rand);
  
      if(!employee) res.status(404).json({message: 'Not found!'});
  
      else res.json(employee)
    }
  
    catch(err) {
      res.status(500).json({message: err});
    }
    };
  
  exports.getId = async (req, res) => {
  
    try {
  
      const employee = await Employee.findById(req.params.id).populate('department');
      if(!employee) res.status(404).json({message: 'Sorry, not found employee with id: ' + (req.params.id)})
      
      else res.json({message: employee });
    }
  
    catch(err) {
      res.status(500).json({message: err});
    }
  };
  
  exports.postNew = async (req, res) => {
   
    const { firstName, lastName, department } = req.body;
   
    try {
      const newEmployee = new Employee({firstName: firstName, lastName: lastName, department: department});
      await newEmployee.save();
      res.json({message: 'Add new employee: ', newEmployee});
    }
  
    catch(err) {
      res.status(500).json({message: err});
    }
  };
  
  exports.putUpdate = async (req, res) => {
    const { firstName, lastName, department } = req.body;
    
    try {
  
      const employee = await(Employee.findById(req.params.id));
      
      if(employee) {
        
        await Employee.updateOne({_id: req.params.id}, {$set: {firstName: firstName, lastName: lastName, department: department}});
        res.json({message: 'change: ', employee})
      }
  
      else res.status(404).json({message: 'Sorry, not found:' + (req.params.id)});
    }
    
    catch(err) {
      res.status(500).json({message: err});
    }
  };
  
  exports.delete = async (req, res) => {
    
    try {
      const employee = await(Employee.findById(req.params.id).populate('department'));
  
      if (employee) {
  
        await Employee.deleteOne({_id: req.params.id});
        res.json({ message: 'Delete:', employee});
      }
      
      else res.status(404).json({message: 'sorry, not found id: ' + (req.params.id)})
    }
  
    catch(err) {
      res.status(500).json({message: err});
    }
  };