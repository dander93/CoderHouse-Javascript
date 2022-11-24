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
        //solo devuelve false en caso de no existir el empleado

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

    deleteEmployee = () =>
    {
        let storage: LocalStorageManager = JSON.parse(this.storageManager.getLocalStorageState());

        storage.
    }

    getEmployeeNameByID = (id) =>
    {
        let employee = this.employees.find(employee => employee.employeeID === id);
        return `${employee.employeeName} ${employee.employeeLastName}`;
    }

    getEmployeesList = () => JSON.parse(this.storageManager.getLocalStorageState().employees);
}