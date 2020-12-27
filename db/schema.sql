-- Drops the programming_db if it already exists
DROP DATABASE IF EXISTS employee_tracker_db;
-- Creates the DB "employee_tracker" 
CREATE DATABASE employee_tracker_db;

-- Uses the DB employee_tracker for all the rest of the script
USE employee_tracker_db;

-- Creates the table "department"
CREATE TABLE department
(
  id INT (10)
  AUTO_INCREMENT NOT NULL,
name VARCHAR
  (30),
PRIMARY KEY
  (id)
);

  -- Creates the table "role"
  CREATE TABLE role
  (
    id INT (10)
    AUTO_INCREMENT NOT NULL,
title VARCHAR
    (30),
salary DECIMAL
    (7,0),
department_id INT
    (10),
PRIMARY KEY
    (id)
);

    -- Creates the table "employee"
    CREATE TABLE employee
    (
      id INT(10)
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
      (id)
);