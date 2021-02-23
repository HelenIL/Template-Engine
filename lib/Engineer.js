const Employee = require('./Employee.js');

class Engineer extends Employee {
    super(name, id, email){
    this.github = github;
    }

    getGitHub() {
    return this.github;
    }

    getRole() {
    return 'Engineer'
    }
}

module.exports = Engineer;

