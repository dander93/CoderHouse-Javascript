class Main {

    employeesTimeManager;
    employeesManager;

    IUManager;

    constructor() {
        this.employeesTimeManager = this.employeesTimeManager || new EmployeesTimeManager();
        this.employeesManager = this.employeesManager || new EmployeesManager();

        this.IUManager = this.IUManager || new IUManagerCore();
    }

    init = () => {
        let validSelection = true;

        do {
            let menuOption = parseInt(this.IUManager.promptMenuOptions());

            validSelection = this.menuSelection(menuOption);

        } while (!validSelection || window.confirm("¿Desea realizar otra operación?"));
    }

    printMenuHeader = () => this.IUManager.messageHelper.printMessageAndAlert("Bienvenido al sistema interactivo de control de horas para el desarrollo");


    getMenuOptions = () =>
    ({
        1: () => this.addEmployeeMenuOption,
        2: () => this.addEmployeeTimeMenuOption,
        3: () => this.modifyEmployeeMenuOption,
        4: () => this.modifyEmployeeTimeMenuOptionMenuOption,
        5: () => console.clear,
        6: () => this.exitMenuOption
    });


    menuSelection = (valor) => {
        this.IUManager.messageHelper.printMessage(`opcion elegida: ${valor}`);

        const menuOpt = this.getMenuOptions();

        return menuOpt[valor] ? menuOpt[valor]()() : false;
    }

    addEmployeeMenuOption = () => {
        do {
            this.employeesManager.addEmployee(this.IUManager.employeesManagerIU.getEmployeeData());
        } while (window.confirm("¿Desea agregar otro?"));

        this.IUManager.messageHelper.printMessage(this.employeesManager.getEmployeesList());
        return true;
    }

    addEmployeeTimeMenuOption = () => {
        do {
            this.employeesTimeManager.addEmployeeTime(this.IUManager.employeesTimeManagerIU.getEmployeeTimeData())
        } while (window.confirm("¿Desea agregar horas a otro empleado?"));

        this.IUManager.messageHelper.printMessage(this.employeesTimeManager.getAllEmployeesTime());

        return true;
    }

    modifyEmployeeMenuOption = () => {
        //TODO modificar datos de empleado
        this.IUManager.messageHelper.notImplementedMessageAlert();

        return true;
    }

    modifyEmployeeTimeMenuOption = () => {
        //TODO modificar horas de empleado
        this.IUManager.messageHelper.notImplementedMessageAlert();

        return true;
    }

    exitMenuOption = () => {
        //TODO deslogueo
        this.IUManager.messageHelper.printMessage("Saliendo..");

        return true;
    }
}
