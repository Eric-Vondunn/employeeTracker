//connects to database
//es5 syntax (require)
const util = require("util");
const mysql = require("mysql");

//call createconnection method
//passing object as parameter
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Milk40!!",
  database: "employee_tracker_db",
});

//variable thats holding this entire call.
//whatever gets returned from mysql library is being stored
connection.connect();

//set up connection.query to use promises instead of callbacks (async await )

// making a new promise and wrapping it aroiund connection so that we can use .then chaining
connection.query = util.promisify(connection.query);

//exporting connection variable from this file
module.exports = connection;
