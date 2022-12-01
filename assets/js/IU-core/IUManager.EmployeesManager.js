class EmplyoeesManagerIU
{

    employeesManager;
    employeesTimeManager;

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
        event.stopPropagation();

        let modal = event.target.parentElement.parentElement;

        const nombreEmpleadoInput = modal.querySelector("#nombreEmpleadoID");
        const horasTrabajadasInput = modal.querySelector("#horasEmpleadoID");

        const empleado = this.employeesManager.addEmployee(nombreEmpleadoInput.value);

        let horasTrabajadas = new EmployeeTime(empleado.employeeID, parseFloat(horasTrabajadasInput.value || 0));
        let totalHorasTrabajadas = this.employeesTimeManager.addEmployeeTime(horasTrabajadas);

        nombreEmpleadoInput.value = '';
        horasTrabajadasInput.value = '';

        this.genEmployeeHTML(empleado, totalHorasTrabajadas);
    }

    addRemoteEmployee = (remoteEmployee) =>
    {
        if (!this.employeesManager.employeeExistById(remoteEmployee.employeeID))
        {
            const empleado = this.employeesManager.addEmployee(remoteEmployee.employeeName, remoteEmployee.employeeID);
            let horasTrabajadas = new EmployeeTime(remoteEmployee.employeeID, parseFloat(remoteEmployee.employeeTime))
            let totalHorasTrabajadas = this.employeesTimeManager.addEmployeeTime(horasTrabajadas);

            this.genEmployeeHTML(empleado, totalHorasTrabajadas);

            return true;
        }

        return false;
    }

    getEmployeeIDbyEventRow = (event) => event.target.parentElement.parentElement.getAttribute("employee-id");

    deleteEmployee = (event) =>
    {
        const employeeID = this.getEmployeeIDbyEventRow(event);

        this.employeesManager.deleteEmployee(employeeID);
        this.removeEmployeeHTMLByID(employeeID);

        Toastify({
            text: `Empleado borrado con exito`,
            duration: 5000,
            close: true,
            gravity: 'bottom',
            position: 'right',
            stopOnFocus: true,
            escapeMarkup: false,
            style: {
                background: "linear-gradient(90deg, #ff2f2f 0%, #822f2f 100%)"
            }
        }).showToast();
    }

    genEmployeeHTML = (empleado, horasTrabajadas) =>
    {

        this.appElementsCore.addIfNotExistInStorage(new MyHTMLElement(`tr-employee-${empleado.employeeID}`, "tr", "tbl-body", null, null, null, `employee-id="${empleado.employeeID}"`, false));
        this.appElementsCore.addIfNotExistInStorage(new MyHTMLElement(`id-employee-${empleado.employeeID}`, "td", `tr-employee-${empleado.employeeID}`, empleado.employeeID, null, null, null, false));
        this.appElementsCore.addIfNotExistInStorage(new MyHTMLElement(`name-employee-${empleado.employeeID}`, "td", `tr-employee-${empleado.employeeID}`, empleado.employeeName, null, null, null, false));
        this.appElementsCore.addIfNotExistInStorage(new MyHTMLElement(`hours-employee-${empleado.employeeID}`, "td", `tr-employee-${empleado.employeeID}`, horasTrabajadas, null, null, null, false));

        //acciones DUMMY
        this.appElementsCore.addIfNotExistInStorage(new MyHTMLElement(`actions-container-${empleado.employeeID}`, "td", `tr-employee-${empleado.employeeID}`, null, null, null, null, false));
        this.appElementsCore.addIfNotExistInStorage(new MyHTMLElement(`btn-action-edit-employee-${empleado.employeeID}`, "button", `actions-container-${empleado.employeeID}`, "Editar", "btn btn-warning", null, `action="edit"`, false));
        this.appElementsCore.addIfNotExistInStorage(new MyHTMLElement(`btn-action-delete-employee-${empleado.employeeID}`, "button", `actions-container-${empleado.employeeID}`, "Borrar", "btn btn-danger mx-1", null, `action="delete"`, false));
    }

    removeEmployeeHTMLByID = (employeeID) => document.querySelector(`#tr-employee-${employeeID}`).remove();

    genEditEmployeeForm = (event) =>
    {

        const employeeID = this.getEmployeeIDbyEventRow(event);

        const modalElement = document.querySelector("#modal-edit-employee-id");
        const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

        modalElement.querySelector("FORM").setAttribute("data-employee-id", employeeID);

        const employeeName = this.employeesManager.getEmployeeById(employeeID).employeeName;

        modalElement.querySelector("#title-modal-edit-employee").innerText = `Editando empleado: ${employeeName}`
        modalElement.querySelector("#editar-nombre-empleado-input").value = employeeName
        modalElement.querySelector("#editar-horas-empleado-input").value = this.employeesTimeManager.getEmployeeTime(employeeID);

        modal.show();
    }


    editEmployee = (event) =>
    {
        const modalElement = event.target.parentElement.parentElement.parentElement;
        const modal = bootstrap.Modal.getInstance(modalElement);

        const newValueTime = modalElement.querySelector("#editar-horas-empleado-input").value;
        const newValueName = modalElement.querySelector("#editar-nombre-empleado-input").value;

        const employeeID = event.target.getAttribute("data-employee-id");

        let editado = this.employeesManager.editEmployee(employeeID, newValueName, parseFloat(newValueTime))

        modal.hide();
        event.target.setAttribute("data-employee-id", "");

        if (editado)
        {
            Toastify({
                text: `Empleado editado con exito`,
                duration: 5000,
                close: true,
                gravity: 'bottom',
                position: 'right',
                stopOnFocus: true,
                escapeMarkup: false,
                style: {
                    background: "linear-gradient(90deg, #28c906 0%, #289706 100%)"
                }
            }).showToast();
        }

    }
}