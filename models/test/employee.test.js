const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose= require ('mongoose');


describe('Employee', () => {
    it('should throw and error if no args',() =>{

        const employee = new Employee({});

        employee.validate(err =>{
            expect(err).to.exist;
            
        });
    });

    it('should throw an error if "firstName","lastName","department" is not a string', () =>{

        const cases = [{firstName: 3, lastName:21, department:14},
                       {firstName: null, lastName:null, department:null},
                       {firstName: undefined, lastName:undefined, department:undefined},
                       {firstName: [], lastName:[], department:[]},
                       {firstName: {}, lastName:{}, department:{}},
                       {firstName: true, lastName:true, department:true},
        ]; //various simple type used in separate objects to check this single type evokes error

        for(let name of cases){
            const emp = new Employee({name});

            emp.validate(err =>{
                expect(err).to.exist;    
            });
        };
    });

    it('should throw an error if "firstName", "lastName","Department" is string type', () =>{
        const cases = [{firstName: 'John', lastName: 'Dan', department: 'IT'}];

        const employee = new Employee({cases});

        employee.validate(err =>{
            expect(err.firstName).to.not.exist;
            expect(err.lastName).to.not.exist;
            expect(err.department).to.not.exist;
        });
    });
});
after(() => {
    mongoose.models = {};
  });
