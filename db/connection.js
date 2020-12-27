//connects to database
//es5 syntax (require)
const util = require("util");
const mysql = require("mysql");

//call createconnection method
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Milk40!!",
  database: "employee_tracker_db",
});

connection.connect();

//set up connection.query to use promises instead of callbacks (async await )

connection.query = util.promisify(connection.query);

module.exports = connection;
