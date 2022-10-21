// Pseudocode:

// Basics:
// download and require all dependencies
// learn how to use console.table package

// Foundation Code:
// create all questions in separate arrays and link together like in command team project
// create db and tables in schema
// seed with info

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to






const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');
const cTable = require('console.table');


// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
const startMenu = [
    {
        type: 'list',
        name: 'mainMenu',
        message: "What would you like to do?",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee role",
        ]
    },
]

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
const addDepartment = [
    {
        type: 'input',
        name: 'newDepartment',
        message: "Enter the name of the department.",
    },
]

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
const addRole = [
    {
        type: 'input',
        name: 'roleName',
        message: "Enter the name of the role.",
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: "Enter the salary of the role.",
    },
    {
        type: 'list',
        name: 'roleDepartment',
        message: "Select the department that the role belongs to.",
        choices: [
            // list from database tables
        ]
    },
]

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
const newEmployee = [
    {
        type: 'input',
        name: 'employeeFirstName',
        message: "Enter the first name of the employee.",
    },
    {
        type: 'input',
        name: 'employeeLastName',
        message: "Enter the last name of the employee.",
    },
    {
        type: 'list',
        name: 'employeeRole',
        message: "Select the role of the employee.",
        choices: [
            // list from database tables
        ]
    },
    {
        type: 'list',
        name: 'employeeManager',
        message: "Select the employee's manager.",
        choices: [
            // list from database tables
        ]
    },
]

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
const updateEmployee = [
    {
        type: 'list',
        name: 'selectEmployee',
        message: "Select an employee to update.",
        choices: [
            // list from database tables
        ]
    },
    {
        type: 'list',
        name: 'selectRole',
        message: "Select an new role for the employee.",
        choices: [
            // list from database tables
        ]
    },
]
