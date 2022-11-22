class EmplyoeesManagerIU {

    employeesManager;
    employeesTimeManage;


    appElementsCore;
    iuManager;

    constructor() {
        this.employeesManager = this.employeesManager || new EmployeesManager();
        this.employeesTimeManager = this.employeesTimeManager || new EmployeesTimeManager();
        this.appElementsCore = this.appElementsCore || new AppElements();

    }

    addEmployee = (event) => {
        event.preventDefault();
        let modal = event.target.parentElement.parentElement;

        const nombreEmpleadoInput = modal.querySelector("#nombreEmpleadoID");
        const horasTrabajadasInput = modal.querySelector("#horasEmpleado");

        let empleado = this.employeesManager.addEmployee(nombreEmpleadoInput.value);

        let horasTrabajadas = new EmployeeTime(empleado.employeeID, parseFloat(horasTrabajadasInput.value || 0));
        let totalHorasTrabajadas = this.employeesTimeManager.addEmployeeTime(horasTrabajadas);



        nombreEmpleadoInput.value = '';
        horasTrabajadasInput.value = '';

        this.appElementsCore.addIfNotExistInStorage(new MyHTMLElement(`tr-employee-${empleado.employeeIndex}`, "tr", "tbl-body", null, null, null, null));
        this.appElementsCore.addIfNotExistInStorage(new MyHTMLElement(`id-employee-${empleado.employeeIndex}`, "td", `tr-employee-${empleado.employeeIndex}`, empleado.employeeID, null, null, null));
        this.appElementsCore.addIfNotExistInStorage(new MyHTMLElement(`name-employee-${empleado.employeeIndex}`, "td", `tr-employee-${empleado.employeeIndex}`, empleado.employeeName, null, null, null));
        this.appElementsCore.addIfNotExistInStorage(new MyHTMLElement(`hours-employee-${empleado.employeeIndex}`, "td", `tr-employee-${empleado.employeeIndex}`, totalHorasTrabajadas, null, null, null));

        this.appElementsCore.populateTable();
    }

}