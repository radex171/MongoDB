const Employee = require('../employee.model');
const expect = require('chai').expect;
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const  mongoose = require ('mongoose');

describe('Employee', () =>{
    before(async () =>{

        try {
          const fakeDB = new MongoMemoryServer();
          const uri = await fakeDB.getConnectionString();
          mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true});
        } catch (err) {
          console.log(err);
        }
      });

    describe('Reading data', () =>{
        beforeEach(async ()=>{
            const testEmployeeOne = new Employee({firstName: 'Thomas', lastName: 'Employee', department: 'first'});
            await testEmployeeOne.save();

            const testEmployeeTwo = new Employee({firstName: 'next', lastName: 'employee', department: 'second'});
            await testEmployeeTwo.save();
        

        
        });
        it('should return all data with "find" method', async () =>{
            const employees = await Employee.find();
            const expectedLength = 2;
            console.log(employees); //from time to time test show result: 2
            expect(employees.length).to.be.equal(expectedLength);
        });

        it('should return a proper by. "firstName" with "findOne" method', async () =>{
            const employeeFindByName = await Employee.findOne({firstName:'Thomas'});
            const employeeFindByLastName = await Employee.findOne({lastName: 'employee'});
            const employeeFindByDepartment = await Employee.findOne({department: 'first'});

            const findFirstName = 'Thomas';
            const findLastName = 'employee';
            const findDepartment = 'first';
            expect(employeeFindByName.firstName).to.be.equal(findFirstName);
            expect(employeeFindByLastName.lastName).to.be.equal(findLastName);
            expect(employeeFindByDepartment.department).to.be.equal(findDepartment);
        });
    
        after(async () =>{
            await Employee.deleteMany();
        });
    });

    describe('Creating data', ()=>{
        it('should insert new document with "insertOne" method', async ()=>{
            const employee = new Employee({fistName: 'new', lastName: 'employee', department: 'new1'});
            await employee.save();

            expect(employee.isNew).to.be.false;
        });
        after(async () =>{
            await Employee.deleteMany();
        });
    });

    describe('Update data', ()=>{
        beforeEach(async ()=>{
            const testEmployeeOne = new Employee({firstName: 'New', lastName: 'Employee', department: 'first'});
            await testEmployeeOne.save();

            const testEmployeeTwo = new Employee({firstName: 'next', lastName: 'employee', department: 'second'});
            await testEmployeeTwo.save();
        });

        it('should properly update one document with "updateOne" method', async () => {
            await Employee.updateOne({ firstName: 'New' }, { $set: { firstName: 'New update' }});
            const updateEmployee = await Employee.findOne({ firstName: 'New update' });
            expect(updateEmployee).to.not.be.null;
        });
        
        it('should properly update one document with "save" method', async ()=>{
            const employee = await Employee.findOne({firstName: "New" });
            employee.firstName = "new is update";
            await employee.save();

            const updateEmployee = await Employee.findOne({firstName: 'new is update'});
            expect(updateEmployee).to.not.be.null;
        });

        it('should properly update multiple documents with "updateMany" method', async () => {
            await Employee.updateMany({}, { $set: { firstName: 'update' }});
            const employees = await Employee.find();
            expect(employees[0].firstName).to.be.equal('update');
            expect(employees[1].firstName).to.be.equal('update');
        }); 
        after(async () =>{
            await Employee.deleteMany();
        });
    });

    describe('Removing data', ()=>{
        beforeEach(async ()=>{
            const testEmployeeOne = new Employee({firstName: 'New', lastName: 'Employee', department: 'first'});
            await testEmployeeOne.save();

            const testEmployeeTwo = new Employee({firstName: 'next', lastName: 'employee', department: 'second'});
            await testEmployeeTwo.save();
        });

        it('should properly remove one document with "deleteOne" method', async () => {
            await Employee.deleteOne({ firstName: 'New' });
      
            const removeEmployee = await Employee.findOne({firstName: 'New'});
            expect(removeEmployee).to.be.null;
          });
        
        it('should properly remove one document with "remove" method', async () => {
            const employee = await Employee.findOne({ firstName: 'New' });
            await employee.remove();
            const removeEmployee = await Employee.findOne({ firstName: 'New' });
            expect(removeEmployee).to.be.null;
        });
        
        it('should properly remove multiple documents with "deleteMany" method', async () => {
            await Employee.deleteMany();
      
            const employees = await Employee.find();
      
            expect(employees.length).to.be.equal(0);
        });
        after(async () =>{
            await Employee.deleteMany();
        });    
    });
    after(() => {
        mongoose.models = {};
    });
});
