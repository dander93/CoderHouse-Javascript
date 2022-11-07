class EmployeesManager {

    employees = [];

    constructor() {
        this.employees = this.employees || [];
    }

    checkEmployeeExist = (id) => this.employees.find(employee => employee.employeeID === id);

    addEmployee = (employee) => {
        
        if (this.checkEmployeeExist(employee.employeeID) === undefined) {
            this.employees.push(employee);
        }

        return this.employees;
    }

    getEmployeeNameByID = (id) => {
        let employee = this.employees.find(employee => employee.employeeID === id);
        return `${employee.employeeName} ${employee.employeeLastName}`;
    }

    getEmployeesList = () => this.employees;
}