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
        let storage = this.storageManager.getLocalStorageState();
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

    deleteEmployee = (employeeID) =>
    {
        let storage = this.storageManager.getLocalStorageState();

        storage.employees = storage.employees.filter(employee => employee.employeeID != employeeID);
        storage.employeesTime = storage.employeesTime.filter(employeeTime => employeeTime.employeeID != employeeID);
        storage.htmlElements = storage.htmlElements.filter(htmlElement => htmlElement.id.indexOf(employeeID) === -1)

        this.storageManager.setActualStorageState(storage)
    }

    editEmployee = (employeeID) =>
    {
        let storage = this.storageManager.getLocalStorageState();


    }

    getEmployeeInformationByID = (id) =>
    {
        const storage = this.storageManager.getLocalStorageState();

        let employee = storage.employees.find(employee => employee.employeeID === id);
        let employeeTime = storage.employeesTime.find(employeeTime => employeeTime.employeeID === id)


        let empleado = {
            employeeID: employee.employeeID,
            employeeName: employee.employeeName,
            employeeTime: employeeTime.employeeTime
        }

        console.log(empleado)
    }


    getEmployeesList = () => JSON.parse(this.storageManager.getLocalStorageState().employees);
}