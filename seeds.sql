INSERT INTO department (name)
VALUES ("Accounting"),
       ("Quality Assurance"),
       ("Sales"),
       ("Human Resources"),
       ("Management");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 80000, 5),
       ("Accountant", 70000, 1),
       ("Sales Person", 60000, 3),
       ("Receptionist", 50000, 4),
       ("Assistant", 40000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Scott", 1, null),
       ("Dwight", "Schrute", 5, 1),
       ("Pam", "Beesly", 4, 1),
       ("Jim", "Halpert", 3, 1),
       ("Oscar", "Martinez", 2, 1);
       