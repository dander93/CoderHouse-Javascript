class EmployeeTime {

    employeeID;
    employeeTime;
    logTime;


    constructor(employeeID, employeeTime) {
        this.employeeID = employeeID;
        this.employeeTime = employeeTime;
        this.logTime = Date.now();
    }

}