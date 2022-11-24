class EmplyoeesManagerIU
{

    employeesManager;
    employeesTimeManage;

    appElementsCore;
    iuManager;

    constructor()
    {
        this.employeesManager = this.employeesManager || new EmployeesManager();
        this.employeesTimeManager = this.employeesTimeManager || new EmployeesTimeManager();
        this.appElementsCore = this.appElementsCore || new AppElements();
    }

    addEmployee = (event) =>
    {
        event.preventDefault();

        let modal = event.target.parentElement.parentElement;

        const nombreEmpleadoInput = modal.querySelector("#nombreEmpleadoID");
        const horasTrabajadasInput = modal.querySelector("#horasEmpleadoID");

        const empleado = this.employeesManager.addEmployee(nombreEmpleadoInput.value);

        let horasTrabajadas = new EmployeeTime(empleado.employeeID, parseFloat(horasTrabajadasInput.value || 0));
        let totalHorasTrabajadas = this.employeesTimeManager.addEmployeeTime(horasTrabajadas);

        nombreEmpleadoInput.value = '';
        horasTrabajadasInput.value = '';

        this.createEmployeeHTML(empleado, totalHorasTrabajadas);
    }

    createEmployeeHTML = (empleado, horasTrabajadas) =>
    {
        
        this.appElementsCore.addIfNotExistInStorage(new MyHTMLElement(`tr-employee-${empleado.employeeID}`, "tr", "tbl-body", null, null, null, `employee-id="${empleado.employeeID}"`, false));
        this.appElementsCore.addIfNotExistInStorage(new MyHTMLElement(`id-employee-${empleado.employeeID}`, "td", `tr-employee-${empleado.employeeID}`, empleado.employeeID, null, null, null, false));
        this.appElementsCore.addIfNotExistInStorage(new MyHTMLElement(`name-employee-${empleado.employeeID}`, "td", `tr-employee-${empleado.employeeID}`, empleado.employeeName, null, null, null, false));
        this.appElementsCore.addIfNotExistInStorage(new MyHTMLElement(`hours-employee-${empleado.employeeID}`, "td", `tr-employee-${empleado.employeeID}`, horasTrabajadas, null, null, null, false));

        //acciones DUMMY
        this.appElementsCore.addIfNotExistInStorage(new MyHTMLElement(`actions-container-${empleado.employeeID}`, "td", `tr-employee-${empleado.employeeID}`, null, null, null, null, false));
        this.appElementsCore.addIfNotExistInStorage(new MyHTMLElement(`btn-action-delete-employee-${empleado.employeeID}`, "button", `actions-container-${empleado.employeeID}`, "Borrar", "btn btn-danger", null, null, false));
    }
}