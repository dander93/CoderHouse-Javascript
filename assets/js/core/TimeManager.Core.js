class EmployeesTimeManager
{

    storageManager;

    constructor()
    {
        this.storageManager = this.storageManager || new LocalStorageManager()
    }

    checkEmployeeHasTime = (id) =>
    {
        let storage = this.storageManager.getLocalStorageState();
        return storage.employeesTime.some(employee => employee.employeeID === id);
    }

    addEmployeeTime = (employeeTime) =>
    {

        let totalEmployeeTime;
        let storage = this.storageManager.getLocalStorageState();

        if (!storage.employeesTime.some(storagedItem => storagedItem.employeeID === employeeTime.employeeID))
        {
            storage.employeesTime.push(employeeTime)
        }

        totalEmployeeTime = storage.employeesTime.find(employee => employee.employeeID === employeeTime.employeeID).employeeTime;
        this.storageManager.setActualStorageState(storage);

        return totalEmployeeTime;
    }

    getEmployeeTime = (id) =>
    {
        let storage = this.storageManager.getLocalStorageState();
        const reduceFunction = (prev, current) => current.employeeID === id ? current.employeeTime + prev : prev;

        return this.checkEmployeeHasTime(id) !== undefined ? storage.employeesTime.reduce(reduceFunction, 0) : 0;
    }

    getAllEmployeesTime = () => this.employeesTime;

}