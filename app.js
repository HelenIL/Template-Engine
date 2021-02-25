//npm packages
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");


//output folder
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

//team classes
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

//team cards and main page
// const managerCard = require('./templates/manager');
// const engineerCard = require('./templates/engineer');
// const internCard = require('./templates/intern');
// const mainHTML = require('./templates/main');

const render = require("./lib/htmlRenderer");

const fullTeam = [];

function promptManager() {
    console.log(chalk.red.underline.bold("Let's build your team!"));
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'managerName',
                message: 'Please enter Manager name:',
                validate(value) {
                    const valid = isNaN(value);
                    return valid || 'Manager name required!';
                }
            },
            {
                type: 'input',
                name: 'managerID',
                message: 'Please enter Manager ID:',
                validate(value) {
                    const valid = !isNaN(parseFloat(value));
                    return valid || 'Manager ID number required!';
                }
            },
            {
                type: 'input',
                name: 'managerEmail',
                message: 'Please enter Manager email:',
                validate(value) {
                    const valid = isNaN(value);
                    return valid || 'Email address required!';
                }
            },
            {
                type: 'input',
                name: 'officeNumber',
                message: 'Please enter Manager office number:',
                validate(value) {
                    const valid = !isNaN(parseFloat(value));
                    return valid || 'Office number required!'
                }
            },
        ])
        .then(function (response) {
            console.log(chalk.magenta("Manager added!"));
            const manager = new Manager(
                response.managerName,
                response.managerID,
                response.managerEmail,
                response.officeNumber
            );
            fullTeam.push(manager);
            addTeamMembers();
        });
    }
        promptManager();

        function addTeamMembers() {
            console.log(chalk.underline.red("Let's add more team members!"));
            inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'addMembers',
                    message: 'Select member type:',
                    choices: [
                        'Add Engineer',
                        'Add Intern',
                        'Done Adding Members',
                    ],
                },
            ])
            .then(function (data) {
                switch (data.addMembers) {
                    case 'Add Engineer': 
                        promptEngineer();
                        break;
                    case 'Add Intern': 
                        promptIntern();
                        break;
                    case 'Done Adding Members': 
                        buildTeam();
                        break;
                }
            });
        }

        function promptEngineer() {
            console.log(chalk.yellow('Adding Engineer!'));
            inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'engineerName',
                    message: 'Please enter Engineer name:',
                    validate(value) {
                    const valid = isNaN(value);
                    return valid || 'Engineer name required!';
                     },
                },
                {
                    type: 'input',
                    name: 'engineerID',
                    message: 'Please enter Engineer ID:',
                    validate(value) {
                        const valid = !isNaN(parseInt(value));
                        return valid || 'Engineer ID number required!';
                    },
                },
                {
                    type: 'input',
                    name: 'engineerEmail',
                    message: 'Please enter Engineer email:',
                    validate(value) {
                        const valid = isNaN(value);
                        return valid || 'Email address required!';
                    },
                },
                {
                    type: 'input',
                    name: 'engineerGithub',
                    message: 'Please enter GitHub username:',
                    validate(value) {
                        const valid = isNaN(value);
                        return valid || 'GitHub username required!';
                    },
                },
            ])
            .then(function (response) {
                console.log(chalk.magenta("Engineer added!"));
                const engineer = new Engineer(
                    response.engineerName,
                    response.engineerID,
                    response.engineerEmail,
                    response.engineerGithub
                );
                fullTeam.push(engineer);
                addTeamMembers();
            });
        }; 

        function promptIntern() {
            console.log(chalk.yellow('Adding Intern!'));
            inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'internName',
                    message: 'Please enter Intern name:',
                    validate(value) {
                        const valid = isNaN(value);
                        return valid || 'Intern name required!';
                    },
                },
                {
                    type: 'input',
                    name: 'internID',
                    message: 'Please enter Intern ID:',
                    validate(value) {
                        const valid = !isNaN(parseFloat(value));
                        return valid || 'Intern ID number required!';
                    },
                },
                {
                    type: 'input',
                    name: 'internEmail',
                    message: 'Please enter Intern email:',
                    validate(value) {
                        const valid = isNaN(value);
                        return valid || 'Email address required!';
                    },
                },
                {
                    type: 'input',
                    name: 'internSchool',
                    message: 'Please enter Intern school:',
                    validate(value) {
                        const valid = isNaN(value);
                        return valid || 'Intern school required!';
                    },
                },
            ])
            .then(function (response) {
                console.log(chalk.magenta("Intern added!"));
                const intern = new Intern(
                    response.internName,
                    response.internID,
                    response.internEmail,
                    response.internSchool
                );
                fullTeam.push(intern);
                addTeamMembers();
            });
        };

        function buildTeam() {
            console.log(chalk.inverse.red("Generating Team!"));
            fs.writeFileSync(outputPath, render(fullTeam), 'utf-8');
        };


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
