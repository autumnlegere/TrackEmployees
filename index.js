// require dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// connection to mysql
const db = mysql.createConnection(
    {
        user: 'root',
        password: '',
        database: 'company_db'
    },
    console.log(`Connected to company_db.`)
);

// question for when user starts application
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

// question for when user selects to add a department
const addDepartment = [
    {
        type: 'input',
        name: 'newDepartment',
        message: "Enter the name of the department.",
    },
]

// function called upon application startup; uses inquirer to display menu question and then calls respective functions for each response option
function start() {
    inquirer.prompt(startMenu).then((response) => {
        if (response.mainMenu === "View all departments") {
            allDepts();
        } else if (response.mainMenu === "View all roles") {
            allRoles();
        } else if (response.mainMenu === "View all employees") {
            allEmps();
        } else if (response.mainMenu === "Add a department") {
            addDept();
        } else if (response.mainMenu === "Add a role") {
            addNewRoles();
        } else if (response.mainMenu === "Add an employee") {
            addEmp();
        } else if (response.mainMenu === "Update an employee role") {
            updateRole();
        };
    });
};

// displays all content in department table, then calls start function again for more options
allDepts = () => {
    db.query(`SELECT * FROM department;`, (err, result) => {
        if (err) throw err;
        console.table(result);
        start();
    });
};

// displays all roles wtih their corresponding id's department names, and salaries, then calls start function again for more options
allRoles = () => {
    db.query(`SELECT role.title, role.id, department.name, department.id, role.salary FROM role JOIN department ON role.department_id = department.id;`, (err, result) => {
        if (err) throw err;
        console.table(result);
        start();
    });
};

// displays employee name, role, department, salary, and manager, then calls start function again for more options
allEmps = () => {
    db.query(`SELECT a.id, a.first_name, a.last_name, role.title, role.id, department.name, department.id, role.salary, CONCAT(b.first_name, ' ', b.last_name) manager FROM employee a JOIN employee b ON a.manager_id = b.id JOIN role ON a.role_id = role.id JOIN department ON role.department_id = department.id;`, (err, result) => {
        if (err) throw err;
        console.table(result);
        start();
    });
};

// displays question to add new department and inserts response in to department table, then calls start function again for more options
addDept = () => {
    inquirer.prompt(addDepartment).then((response) => {
        console.log(response.newDepartment);
        db.query(`INSERT INTO department SET ?`, { name: response.newDepartment, }, (err, result) => {
            if (err) throw err;
            console.log(`${response.newDepartment} added successfully.`);
            start();
        })
    });
};

// displays questions to add new role and inserts responses in to role table, then calls start function again for more options
addNewRoles = () => {
    db.query(`SELECT * FROM department;`, (err, result) => {
        if (err) throw err;
        // variable used to display all departments; used in prompt question below
        let departmentList = result.map(department => ({ name: department.name, value: department.id }));
        inquirer.prompt([
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
                choices: departmentList,
            },
        ]).then((response) => {
            db.query(`INSERT INTO role SET ?`, { title: response.roleName, salary: response.roleSalary, department_id: response.roleDepartment, }, (err, result) => {
                if (err) throw err;
                console.log(`Role added successfully.`);
                start();
            })
        });
    })

};

// displays questions to add new employee and inserts responses in to employee table, then calls start function again for more options
addEmp = () => {
    db.query(`SELECT * FROM role;`, (err, result) => {
        if (err) throw err;
        // variable used to display all roles; used in prompt question below
        let roleList = result.map(role => ({ name: role.title, value: role.id }));
        db.query(`SELECT * FROM employee;`, (err, result) => {
            if (err) throw err;
            // variable used to display all employees; used in prompt question below
            let employeeList = result.map(employee => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.id }));
            inquirer.prompt([
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
                    choices: roleList,
                },
                {
                    type: 'list',
                    name: 'employeeManager',
                    message: "Select the employee's manager.",
                    choices: employeeList
                },
            ]).then((response) => {
                db.query(`INSERT INTO employee SET ?`, { first_name: response.employeeFirstName, last_name: response.employeeLastName, role_id: response.employeeRole, manager_id: response.employeeManager, }, (err, result) => {
                    if (err) throw err;
                    console.log(`Employee added successfully.`);
                    start();
                })
            });
        })
    })

};

// displays questions to update an employees role in employee table, then calls start function again for more options
updateRole = () => {
    db.query(`SELECT * FROM role;`, (err, result) => {
        if (err) throw err;
        // variable used to display all roles; used in prompt question below
        let roleList = result.map(role => ({ name: role.title, value: role.id }));
        db.query(`SELECT * FROM employee;`, (err, result) => {
            if (err) throw err;
            // variable used to display all employees; used in prompt question below
            let employeeList = result.map(employee => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.id }));
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'selectEmployee',
                    message: "Select the employee whose role you would like to update.",
                    choices: employeeList,
                },
                {
                    type: 'list',
                    name: 'selectRole',
                    message: "Select an new role for the employee.",
                    choices: roleList,
                },
            ]).then((response) => {
                db.query(`UPDATE employee SET ? WHERE ?`, [{role_id: response.selectRole,}, {id: response.selectEmployee,},], (err, result) => {
                    console.log
                    if (err) throw err;
                    console.log(`Employee updated successfully.`);
                    start();
                })
            });
        })
    })
};

// calls function upon starting the application
start();