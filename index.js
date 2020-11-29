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
      choice: 
    },
  ]);
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
