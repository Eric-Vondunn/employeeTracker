
-- Inserts a set of records into the "department" table
INSERT INTO department
  (department)
VALUE
("Sales"),
("Engineering"),
("Legal"),
("Finance");

-- Inserts a set of records into the "role" table
INSERT INTO role
  (title, salary, department_id)
VALUE
("Sales Lead",
100000,
1
),
("Salesperson", 80000, 1),
("Lead Engineer", 150000, 2),
("Software Engineer", 120000, 2),
("Accountant", 125000, 4),
("Legal Team Lead", 250000, 3),
("Lawyer", 190000, 3);

-- Inserts a set of records into the "employee" table
INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUE
("John",
"Doe",
1,
3
),
("Mike", "Chan", 2, 1),
("Ashley", "Rodriguez", 3, NULL),
("Kevin", "Tupik", 4, 3),
("Malia", "Brown", 5, NULL),
("Sarah", "Lourd", 6, NULL),
("Tom", "Allen", 7, 6);


SELECT *
FROM department;
SELECT *
FROM role;
SELECT *
FROM employee;