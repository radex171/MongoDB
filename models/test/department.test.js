const Department = require('../department.model.js');
const expect = require('chai').expect;
const mongoose= require ('mongoose');

describe('Department', () => {

  it('should throw an error if no "name" arg', () => {
    const dep = new Department({}); // create new Department, but don't set `name` attr value

    dep.validate(err => {
      expect(err.errors.name).to.exist;    
    });
  });

  it('should throw an error if "name" is not a string', () => {

      const cases = [{}, []];
      for(let name of cases) {
        const dep = new Department({ name });
    
        dep.validate(err => {
          expect(err.errors.name).to.exist;
        });
    
      }
    
    });

  it('should throw an error if length "name" is short to 5 signs and over 20 signs', () =>{
      const cases = ['yes', 'this is text over twenty signs', 'ok'];
      for (let nam of cases) {
          const dep = new Department({ nam });
          dep.validate(err =>{
              expect(err.errors.name).to.exist;
          });
      } 
  });

  it('should throw an error when "name" have good length & is string type', ()=>{
      const cases = ['this is good string', 'its next good string'];
      for(let name of cases) {
          const dep = new Department({name});
          dep.validate(err =>{
              expect(err).to.not.exist;
          });
      }
  });
});
after(() => {
    mongoose.models = {};
});
