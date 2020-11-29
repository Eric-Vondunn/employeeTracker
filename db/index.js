const connection = require("./connection");

class DB {
  //keep reference to connection
  constructor(connection) {
    this.connection = connection;
  }

  //find all employees and join / display roles
  findAllEmployees() {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee WHERE id != ?",
      employeeID
    );
  }

  findAllPossibleManagers(employeeID) {
    return this.connection.query(
      "SELECT id, first_name, last_name FROM employee WHERE id != ?",
      employeeID
    );
  }
}
