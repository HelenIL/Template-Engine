const Employee = require('./Employee.js');

class Intern extends Employee {
    super(name, id, email) {
    this.school = school;
    }

    getSchool() {
        return this.school;
    }

    getRole() {
        return 'Intern'
    }
}

module.exports = Intern; 