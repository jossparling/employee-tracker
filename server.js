// const cTable = require('console.table');
const inquirer = require('inquirer');

const promptUser = () => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'department',
        message: 'What is the department name? (Required)'
      },
      {
        type: 'input',
        name: 'role',
        message: 'Enter the role (Required)'
      }
    ]);
};

promptUser();