const connection = require("./connection");

class DB {
  //keep reference to connection
  constructor(connection) {
    this.connection = connection;
  }

  //find all employees and join / display roles
  findAllEmployees() {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }

  findAllPossibleManagers(employeeID) {
    return this.connection.query(
      "SELECT id, first_name, last_name FROM employee WHERE id != ?",
      employeeID
    );
  }

  //create employee
  createEmployee(employee) {
    return this.connection.query("INSERT INTO employee SET ?", employee);
  }

  //remove employee by id
  removeEmployee(employeeID) {
    return this.connection.query(
      "DELETE FROM employee WHERE id = ?",
      employeeID
    );
  }

  //update specific employee role
  updateEmployeeRole(employeeID, roleId) {
    return this.connection.query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [roleID, employeeId]
    );
  }

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

  createRoll(role) {
    return this.connection.query("INSERT INTO role SET ?", role);
  }

  //remove role
  removeRole(roleId) {
    return this.connection.query("DELETE FROM role WHERE id = ?", roleId);
  }

  //find all departments

  findAllDepartments() {
    return this.connection.query(
      "SELECT department.id, department.name, SUM(role.salary AS utilized_budget FROM employee left"
    );
  }

  //create a new department
  createDepartment(department) {}

  removeDepartment(departmentId) {
    return this.connection.query(
      "DELETE FROM department WHERE id = ?",
      departmentId
    );
  }

  //not done
  //find all employees by department
  findAllEmployeesByDepartment(departmentId) {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN",
      departmentId
    );
  }

  //not done
  findAllEmployeesByManager(managerId) {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department,",
      managerId
    );
  }
}

//connection object?
module.exports = new DB(connection);
