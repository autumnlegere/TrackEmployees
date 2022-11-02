-- list of department names added to department table
INSERT INTO department (name)
VALUES ("Accounting"),
       ("Quality Assurance"),
       ("Sales"),
       ("Human Resources"),
       ("Management");

-- list of role tites, salaries, and department id's added to role table
INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 80000, 5),
       ("Accountant", 70000, 1),
       ("Sales Person", 60000, 3),
       ("Receptionist", 50000, 4),
       ("Assistant", 40000, 3);

-- list of employee names, role id's and managers added to employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Scott", 1, null),
       ("Dwight", "Schrute", 5, 1),
       ("Pam", "Beesly", 4, 1),
       ("Jim", "Halpert", 3, 1),
       ("Oscar", "Martinez", 2, 1);
       