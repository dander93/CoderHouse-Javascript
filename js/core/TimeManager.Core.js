class EmployeesTimeManager {

    employeesTime = [];

    constructor() {
        this.employeesTime = this.employeesTime || [];
    }

    checkEmployeeHasTime = (id) => this.employeesTime.find(employee => employee.employeeID === id);

    addEmployeeTime = (employeeTime) => this.employeesTime.push(employeeTime);


    getEmployeeTime = (id) => {

        const reduceFunction = (prev, current) => current.employeeID === id ? current.employeeTime + prev : prev;

        return this.checkEmployeeHasTime(id) !== undefined ? this.employeesTime.reduce(reduceFunction, 0) : 0;
    }

    getAllEmployeesTime = () => this.employeesTime;

}