// const cTable = require('console.table');
const inquirer = require('inquirer');
const db = require("./db");
require("console.table");

function init() {
  console.log("Employees, Departments, and Roles Interface")
  loadPrompts();
}

function loadPrompts() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES"
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_ROLE"
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES"
        },
        {
          name: "Add Role",
          value: "ADD_ROLE"
        },
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS"
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT"
        }
      ]
    }
  ]).then(res => {
    let choice = res.choice;
    switch (choice) {
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
    }
  })
}

function viewEmployees() {
  db.findAllEmployees()
  .then(([rows]) => {
    let employees = rows;
    console.log("\n");
    console.table(employees);
  })
  .then(() => loadPrompts());
}

function viewEmployeesByDepartment() {
  db.findAllDepartments()
  .then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));

    prompt([
      {
        type: "list",
        name: "departmentId",
        message: "Which department would you like to see employees for?",
        choices: departmentChoices
      }
    ])
    .then(res => db.findAllEmployeesByDepartment(res.departmentId))
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.log(employees);
    })
    .then(() => loadPrompts())
  });
}