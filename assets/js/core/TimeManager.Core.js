class EmployeesTimeManager
{

    storageManager;

    constructor()
    {
        this.storageManager = this.storageManager || new LocalStorageManager()
    }

    checkEmployeeHasTime = (id) => this.employeesTime.find(employee => employee.employeeID === id);

    addEmployeeTime = (employeeTime) =>
    {

        let totalEmployeeTime;
        let storage = JSON.parse(this.storageManager.getLocalStorageState());

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

        const reduceFunction = (prev, current) => current.employeeID === id ? current.employeeTime + prev : prev;

        return this.checkEmployeeHasTime(id) !== undefined ? this.employeesTime.reduce(reduceFunction, 0) : 0;
    }

    getAllEmployeesTime = () => this.employeesTime;

}