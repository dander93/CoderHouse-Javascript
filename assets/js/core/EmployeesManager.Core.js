class EmployeesManager
{

    storageManager;
    timeManager;

    constructor()
    {
        this.storageManager = this.storageManager || new LocalStorageManager();
        this.timeManager = this.timeManager || new EmployeesTimeManager();

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

    editEmployee = (employeeID, newNameValue, newTimeValue) =>
    {
        const prevTimeValue = this.timeManager.getEmployeeTime(employeeID);
        const employee = this.getEmployeeById(employeeID);

        if (employee.employeeName != newNameValue || prevTimeValue != newTimeValue)
        {

            let storage = this.storageManager.getLocalStorageState();
            storage.employees[storage.employees.findIndex(employee => employee.employeeID === employeeID)].employeeName = newNameValue;

            storage.htmlElements.forEach(element =>
            {
                if (element.id == `hours-employee-${employeeID}`)
                {
                    element.text = newTimeValue;
                }

                if (element.id == `name-employee-${employeeID}`)
                {
                    element.text = newNameValue;
                }
            });
            this.storageManager.setActualStorageState(storage);


            this.timeManager.removeEmployeeTimeByID(employeeID);
            this.timeManager.addEmployeeTime(new EmployeeTime(employeeID, newTimeValue));

            return true;
        }

        return false;
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