class EmployeesManager
{

    storageManager;

    constructor()
    {
        this.storageManager = this.storageManager || new LocalStorageManager()
    }

    checkEmployeeExist = (id) => this.storageManager.employees.find(employee => employee.employeeID === id);

    addEmployee = (employeeName) =>
    {
        let storage = JSON.parse(this.storageManager.getLocalStorageState());
        let employee;

        if (!storage.employees.some(storagedItem => storagedItem.employeeName === employeeName))
        {
            employee = new Employee(crypto.randomUUID(), employeeName, this.lastEmployee)
            storage.employees.push(employee);
        } else
        {
            employee = storage.employees.find(storagedItem => storagedItem.employeeName === employeeName)
        }

        this.storageManager.setActualStorageState(storage);
        return employee;
    }

    deleteEmployee = (idEmpleado) =>
    {
        let storage = JSON.parse(this.storageManager.getLocalStorageState());

        storage.employees = storage.employees.filter(employee => employee.employeeID != idEmpleado);
        storage.employeesTime = storage.employeesTime.filter(employeeTime => employeeTime.employeeID != idEmpleado);
        storage.htmlElements = storage.htmlElements.filter(htmlElement => htmlElement.id.indexOf(idEmpleado) === -1)

        this.storageManager.setActualStorageState(storage)
    }

    getEmployeeNameByID = (id) =>
    {
        let employee = this.employees.find(employee => employee.employeeID === id);
        return `${employee.employeeName} ${employee.employeeLastName}`;
    }

    getEmployeesList = () => JSON.parse(this.storageManager.getLocalStorageState().employees);
}