-- Drops the programming_db if it already exists
DROP DATABASE IF EXISTS employee_tracker_db;
-- Creates the DB "employee_tracker" 
CREATE DATABASE employee_tracker_db;
-- Uses the DB employee_tracker for all the rest of the script
USE employee_tracker_db;
-- Creates the table "department"
CREATE TABLE department
(
      department_id INT
      AUTO_INCREMENT NOT NULL,
      department VARCHAR
      (30),
      PRIMARY KEY
      (department_id)
);
      -- Creates the table "role"
      CREATE TABLE role
      (
            role_id INT
            AUTO_INCREMENT NOT NULL,
      title VARCHAR
            (30) NOT NULL,
      salary DECIMAL
            (9, 2) NOT NULL,
      department_id INT
            (10),
      PRIMARY KEY
            (role_id)
);

            -- Creates the table "employee"
            CREATE TABLE employee
            (
                  employee_id INT
                  AUTO_INCREMENT NOT NULL,
      first_name VARCHAR
                  (30),
      last_name VARCHAR
                  (30),
      role_id INT
                  (10),
      manager_id INT
                  (10) DEFAULT NULL,
      PRIMARY KEY
                  (employee_id),
      FOREIGN KEY
                  (role_id) REFERENCES role
                  (role_id)
      
);