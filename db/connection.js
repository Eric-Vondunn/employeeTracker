const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Milk40!!",
  database: "employees",
});

connection.connect();

//set up connection.query to use promises instead of callbacks (async await )

connection.query = util.promisify(connection.query);

module.exports = connection;
