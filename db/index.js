//helper functions to enter data into database
//connects to connection file
const connection = require("./connection");

class DB {
  //keep reference to connection
  constructor(connection) {
    this.connection = connection;
  }

  //all methods go inside your class

  //find all employees and join / display roles

  //method that belongs db
  //to execute call db.findAllEmployees
  findAllEmployees() {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }

  //method that belongs to db
  findAllPossibleManagers(employeeID) {
    return this.connection.query(
      "SELECT id, first_name, last_name FROM employee WHERE id != ?",
      employeeID
    );
  }
  //method that belongs to db
  //create employee
  createEmployee(employee) {
    return this.connection.query("INSERT INTO employee SET ?", employee);
  }
  //method that belongs to db
  //remove employee by id
  removeEmployee(employeeID) {
    return this.connection.query(
      "DELETE FROM employee WHERE id = ?",
      employeeID
    );
  }
  //method that belongs to db
  //update specific employee role
  updateEmployeeRole(employeeID, roleId) {
    return this.connection.query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [roleID, employeeId]
    );
  }

  //method that belongs to db
  //update employees management

  updateEmployeeManager(employeeId, managerId) {
    return this.connection.query(
      "UPDATE employee SET manager_id = ? WHERE id = ?",
      [managerId, employeeId]
    );
  }

  //find all roles
  findAllRoles() {
    return this.connection.query(
      "SELECT role.id, role.title, department.name AS department, role.salary"
    );
  }

  //create new role
  //method that belongs to db
  createRoll(role) {
    return this.connection.query("INSERT INTO role SET ?", role);
  }

  //method that belongs to db
  //remove role
  removeRole(roleId) {
    return this.connection.query("DELETE FROM role WHERE id = ?", roleId);
  }

  //method that belongs to db
  //find all departments

  findAllDepartments() {
    return this.connection.query(
      "SELECT department.id, department.name, SUM(role.salary AS utilized_budget FROM employee left"
    );
  }

  //method that belongs to db
  //create a new department
  createDepartment(department) {}

  //method that belongs to db
  removeDepartment(departmentId) {
    return this.connection.query(
      "DELETE FROM department WHERE id = ?",
      departmentId
    );
  }

  //method that belongs to db
  //not done
  //find all employees by department
  findAllEmployeesByDepartment(departmentId) {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN",
      departmentId
    );
  }

  //method that belongs to db
  //not done
  findAllEmployeesByManager(managerId) {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department,",
      managerId
    );
  }
}

//exporting new db object and passing through connection
module.exports = new DB(connection);
