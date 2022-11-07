class Employee {

    employeeID;
    employeeName;
    employeeLastName;

    constructor(employeeID,employeeName,employeeLastName) {
        this.employeeID = employeeID;
        this.employeeName = employeeName;
        this.employeeLastName = employeeLastName;
    }

    getEmployeeNameByID = (employeeID) => $`{this.employeeName} {this.employeeLastName}`;
}