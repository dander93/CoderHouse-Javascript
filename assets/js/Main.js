class Main {

    employeesTimeManager;
    employeesManager;

    IUManager;

    StorageManager;

    constructor() {
        this.employeesTimeManager = this.employeesTimeManager || new EmployeesTimeManager();
        this.employeesManager = this.employeesManager || new EmployeesManager();

        this.IUManager = this.IUManager || new IUManagerCore();

        this.StorageManager = this.StorageManager || new LocalStorageManager();

        this.init();
    }

    init = () => {
        this.IUManager.createPage();
    }


    

}