// this file gets your command line to work

// require inquirer and mysql
const inquirer = require("inquirer");
const logo = require("asciiart-logo");

// imports db folder
const db = require("./db");
require("console.table");
// make a connection

// init
init();

// //display logo
function init() {
  const logoText = logo({ name: "Employee Manager" }).render();

  console.log(logoText);
}

start();

// Questions for app
function start() {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "Update an Employee's Role",
        "Add Employee",
        "Add Role",
        "Add Department",
        "EXIT",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View All Employees":
          viewAllEmployees();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Update an Employee's Role":
          updateRole();
          break;

        case "EXIT":
          break;
      }
    });
}

//
async function viewAllEmployees() {
  const employees = await db.findAllEmployees();
  console.table("\n");
  console.table(employees);
  start();
}

//
async function addEmployee() {
  try {
    const roles = await db.findAllRoles();
    const managers = await db.findAllEmployees();

    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter employee's first name:",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter employee's last name:",
      },
      {
        type: "list",
        name: "role",
        message: "Select employee's role:",
        choices: function () {
          let choiceArray = [];
          for (var i = 0; i < roles.length; i++) {
            choiceArray.push(roles[i].title);
          }
          return choiceArray;
        },
      },
      {
        type: "list",
        name: "manager",
        message: "Select employee's manager:",
        choices: function () {
          let choiceArray = [];
          for (var i = 0; i < managers.length; i++) {
            choiceArray.push(
              `${managers[i].first_name} ${managers[i].last_name}`
            );
          }
          return choiceArray;
        },
      },
    ]);

    for (var i = 0; i < roles.length; i++) {
      if (roles[i].title === answers.role) {
        newRoleId = roles[i].role_id;
      }
    }

    for (var i = 0; i < managers.length; i++) {
      if (
        `${managers[i].first_name} ${managers[i].last_name}` === answers.manager
      ) {
        newManagerId = managers[i].employee_id;
      }
    }

    await db.createEmployee(answers, newRoleId, newManagerId);
    console.table(
      `\n* * * * * * * * * * ${answers.firstName} ${answers.lastName} has been added. * * * * * * * * * * \n`
    );
    start();
  } catch (err) {
    console.log(err);
  }
}

//
async function addRole() {
  try {
    const roles = await db.findAllRoles();
    const departments = await db.findAllDepartments();

    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "Enter role you would like to add:",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter salary for this role:",
      },
      {
        type: "list",
        name: "dept",
        message: "Select role's department:",
        choices: function () {
          let choiceArray = [];
          for (var i = 0; i < departments.length; i++) {
            choiceArray.push(departments[i].department);
          }
          return choiceArray;
        },
      },
    ]);

    for (var i = 0; i < departments.length; i++) {
      if (departments[i].department === answers.dept) {
        newDeptId = departments[i].dept_id;
      }
    }

    await db.createRole(answers, newDeptId);
    console.table(
      `\n* * * * * * ${answers.title} has been added. * * * * *  \n`
    );
    start();
  } catch (err) {
    console.log(err);
  }
}

//
async function addDepartment() {
  try {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "dept",
        message: "Enter department you would like to add:",
      },
    ]);

    await db.createDepartment(answers);
    console.table(`\n* * * * * ${answers.dept} has been added. * * * * * \n`);
    start();
  } catch (err) {
    console.log(err);
  }
}

//
async function updateRole() {
  try {
    const employees = await db.findAllEmployees();
    const roles = await db.findAllRoles();
    const managers = await db.findAllEmployees();

    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "emp",
        message: "Select employee to update:",
        choices: function () {
          let choiceArray = [];
          for (var i = 0; i < employees.length; i++) {
            choiceArray.push(
              `${employees[i].first_name} ${employees[i].last_name}`
            );
          }
          return choiceArray;
        },
      },
      {
        type: "list",
        name: "role",
        message: "Select employee's NEW role:",
        choices: function () {
          let choiceArray = [];
          for (var i = 0; i < roles.length; i++) {
            choiceArray.push(roles[i].title);
          }
          return choiceArray;
        },
      },
      {
        type: "list",
        name: "manager",
        message: "Select employee's NEW manager:",
        choices: function () {
          let choiceArray = [];
          for (var i = 0; i < managers.length; i++) {
            choiceArray.push(
              `${managers[i].first_name} ${managers[i].last_name}`
            );
          }
          return choiceArray;
        },
      },
    ]);

    for (var i = 0; i < employees.length; i++) {
      if (
        `${employees[i].first_name} ${employees[i].last_name}` === answers.emp
      ) {
        empId = employees[i].employee_id;
      }
    }
    for (var i = 0; i < roles.length; i++) {
      if (roles[i].title === answers.role) {
        newRoleId = roles[i].role_id;
      }
    }

    for (var i = 0; i < managers.length; i++) {
      if (
        `${managers[i].first_name} ${managers[i].last_name}` === answers.manager
      ) {
        newManagerId = managers[i].employee_id;
      }
    }

    await db.updateEmployee(empId, newRoleId, newManagerId);
    console.table(
      `\n* * * * * * ${answers.emp}'s role has been changed to ${answers.role}. * * * * * *\n`
    );
    start();
  } catch (err) {
    console.log(err);
  }
}
