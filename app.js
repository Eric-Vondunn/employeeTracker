// Dependencies
var express = require("express");
var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");
var figlet = require("figlet");
var handlebars = require("handlebars");

// Set the port of our application
// process.env.PORT lets the port be
var PORT = process.env.PORT || 8080;
// Create express app instance.

var app = express();
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Milk40!!",
  database: "seeds.ql",
});

connection.connect(function (err) {
  if (err) throw err;
  startApp();
});

// figlet code to display drawing of employee tracker

figlet("EMPLOYEE TRACKER!!", function (err, data) {
  if (err) {
    console.log("Something went wrong");
    console.dir(err);
    return;
  }

  console.log(data);
});

//function that starts the app

function startApp() {
  inquirer
    .prompt({
      name: "action",
      type: "ralwlist",
      message: "what would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "View Departments",
        "View roles",
        "Add department",
        "Add role",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "EXIT",
      ],
    })

    // switch statement for decision function
    .then(function (answer) {
      switch (answer.action) {
        case "View All Employees":
          viewEmployees();
          break;

        case "View All Employees By Department":
          viewEmployeesByDept();
          break;

        case "View departments":
          viewDept();
          break;

        case "View roles":
          viewRoles();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add department":
          addDept();
          break;

        case "Add role":
          addRole();
          break;

        case "Remove Employee":
          removeEmployee();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "Update Employee Manager":
          updateEmployeeMng();
          break;

        case "EXIT":
          console.log("Thanks for using Employee Tracker! Have a nice day!");
          process.exit();
      }
    });
}

//Function view all employees
function viewEmployees() {
  var query = `SELECT employees.id, employees.first_name, employees.last_name, role.title, departments.name AS department, role.salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS Manager FROM employees LEFT JOIN role on employees.role_id = role.id 
    LEFT JOIN departments on role.department_id = departments.id LEFT JOIN employees manager on manager.id = employees.manager_id;`;
  connection.query(query, function (err, query) {
    console.table(query);
    startApp();
  });
}

//Function view all employees by department
function viewEmployeesByDept() {
  var query = `SELECT departments.name AS department, employees.id, employees.first_name, employees.last_name, role.title FROM employees LEFT JOIN role on 
    employees.role_id = role.id LEFT JOIN departments departments on role.department_id = departments.id WHERE departments.id;`;
  connection.query(query, function (err, query) {
    console.table(query);
    startApp();
  });
}

//Function to view all departments
function viewDept() {
  var query = `select id AS Dept_ID, name AS departments from departments;`;
  connection.query(query, function (err, query) {
    console.table(query);
    startApp();
  });
}

//Function to view all roles
function viewRoles() {
  var query = `select id AS Role_ID, title, salary AS Salaries from role;`;
  connection.query(query, function (err, query) {
    console.table(query);
    startApp();
  });
}

// Routes
app.get("/cast", function (req, res) {
  connection.query("SELECT * FROM actors ORDER BY id", function (err, result) {
    if (err) throw error;
    const html = "<h1>Here are all the actors by id</h1>";
    res.send(html);
  });
});
// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
