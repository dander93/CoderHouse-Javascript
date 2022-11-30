class EmployeesManager
{

    storageManager;

    constructor()
    {
        this.storageManager = this.storageManager || new LocalStorageManager()
    }

    checkEmployeeExist = (id) => this.storageManager.employees.find(employee => employee.employeeID === id);

    addEmployee = (employeeName, employeeID) =>
    {

        let storage = this.storageManager.getLocalStorageState();
        let employee;

        if (employeeID && employeeName)
        {
            employee = this.getEmployeeById(employeeID);
        }
        else
        {
            employee = this.getEmployeeByname(employeeName);
        }

        if (!employee)
        {
            employee = new Employee(employeeID || crypto.randomUUID(), employeeName)
            storage.employees.push(employee);
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

    employeeExistById(employeeID)
    {
        let storage = this.storageManager.getLocalStorageState();

        return storage.employees.some(storagedItem => storagedItem.employeeID === employeeID)
    }

    employeeExistByName(employeeName)
    {
        let storage = this.storageManager.getLocalStorageState();
        return storage.employees.some(storagedItem => storagedItem.employeeName === employeeName)
    }

    getEmployeeById(employeeID)
    {
        let storage = this.storageManager.getLocalStorageState();
        return storage.employees.find(storagedItem => storagedItem?.employeeID === employeeID)
    }

    getEmployeeByname(employeeName)
    {
        let storage = this.storageManager.getLocalStorageState();
        return storage.employees.find(storagedItem => storagedItem?.employeeName === employeeName)
    }



    getEmployeesList = () => JSON.parse(this.storageManager.getLocalStorageState().employees);
}