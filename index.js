// require inquirer and mysql
const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");
// make a connection

// init
init();

let init = () => {
  const logoText = logo({ name: "Employee Manager" }).render();

  console.log(logoText);

  loadMainPrompts();
};

async function loadMainPrompts() {
  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "View All Employees By Department",
          value: "VIEW_EMPLOYEES_BY_DEPARTMENT",
        },
        {
          name: "View All Employees By Manager",
          value: "VIEW_EMPLOYEES_BY_MANAGER",
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "Remove Employee",
          value: "REMOVE_EMPLOYEE",
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE",
        },
        {
          name: "Update Employee Manager",
          value: "UPDATE_EMPLOYEE_MANAGER",
        },
        {
          name: "View All Roles",
          Value: "VIEW_ROLES",
        },
        {
          name: "Remove Role",
          value: "REMOVE_ROLE",
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT",
        },
        {
          name: "Remove Department",
          value: "REMOVE_DEPARTMENT",
        },
        {
          name: "Quit",
          value: "QUIT",
        },
      ],
    },
  ]);
}

//Call function based on user choice
switch (choice) {
  case "VIEW_EMPLOYEES":
    return viewEmployees();
  case "VIEW_EMPLOYEES_BY_DEPARTMENT":
    return viewEmployeesByDepartment();
  case "VIEW_EMPLOYEES_BY_MANAGER":
    return viewEmployeesByManager();
  case "ADD_EMPLOYEE":
    return addEmployee();
  case "REMOVE_EMPLOYEE":
    return removeEmployee();
  case "UPDATE_EMPLOYEE_ROLE":
    return updateEmployeeRole();
  case "UPDATE_EMPLOYEE_MANAGER":
    return updateEmployeeManager();
  case "VIEW_DEPARTMENTS":
    return viewDepartments();
  case "ADD_DEPARTMENT":
    return addDepartment();
  case "REMOVE_DEPARTMENT":
    return removeDepartment();
  case "VIEW_ROLES":
    return viewRoles();
  case "ADD_ROLE":
    return addRole();
  case "REMOVE_ROLE":
    return removeRole();
  default:
    return quit();
}

// when promise below resolves it will give us our data
async function viewEmployees() {
  const employees = await db.findAllEmployees();

  console.log("\n");
  console.table(employees);

  loadMainPrompts();
}

async function viewEmployeesByDepartment() {
  const departments = await db.findAllDepartments();

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id,
  }));

  console.log("\n");
  console.table(employees);

  loadMainPrompts();
}

// main menu

// ask questions

// add dept roles and employees

//view dept roles etc

//update employee roles

//function add
//ask what table?

//connection.query (insert into)

//function view
//ask what table

//connection.query (select)

//function update
//ask what table

//connection.query )update SET)
