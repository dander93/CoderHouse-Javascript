class IUManagerCore
{

    pasteBinEmployeesFileName = "pasteBinCodesForEmployees";
    pasteBinApiUrl = "https://api.allorigins.win/get?url=https://pastebin.com/raw";

    employeesManagerIU;
    employeesTimeManagerIU;
    messageHelper;
    appElements;
    storageManager;

    constructor()
    {
        this.storageManager = this.storageManager || new LocalStorageManager()
        this.employeesManagerIU = this.employeesManagerIU || new EmplyoeesManagerIU();
        this.appElements = this.appElements || new AppElements();
    }

    createPage = () =>
    {
        let storage = this.storageManager.getLocalStorageState();
        const entryPoint = document.querySelector(this.appElements.entryPoint);

        const estructure = document.createElement("div");
        estructure.id = "mainEstructure";
        estructure.classList.add("container-md");

        storage.htmlElements.filter(element => element.added === false).forEach(element =>
        {
            const createdElement = this.createELement(element);
            this.populateChildrens(estructure, createdElement);
        });

        entryPoint.parentNode.replaceChild(estructure, entryPoint);

        this.checkForDefaultEmployees();

        this.storageManager.setActualStorageState(storage);
    }

    createELement(elem)
    {
        let createdElement = document.createElement(elem.type);
        createdElement.innerText = elem.text;
        createdElement.id = elem.id;
        createdElement.setAttribute("father-element", elem.fatherID);

        if (elem.classList)
        {
            createdElement.classList = elem.classList;
        }

        if (elem.optionalPropertys)
        {
            let atributes = elem.optionalPropertys.split(' ').map(attr => attr.split('='));

            atributes.forEach(atribute => createdElement.setAttribute(atribute[0].replaceAll('"', ''), atribute[1].replaceAll('"', '')))
        }

        return createdElement;
    }

    populateChildrens = (estructure, children) =>
    {
        if (children.getAttribute("father-element") === estructure.id)
        {
            estructure.appendChild(children)
        } else
        {
            estructure.querySelector(`#${children.getAttribute("father-element")}`).appendChild(children)
        }
    }

    addDefaultEvents = () =>
    {
        document.querySelector("#form-add-employee")?.addEventListener('submit', this.addEmployeeFormHandler);

        document.querySelector("#btn-borrar-storage")?.addEventListener("click", this.deleteLocalStorageButtonHandler);

        document.querySelector("#btn-reload")?.addEventListener("click", () => window.location.reload());

        window.addEventListener("storaged", this.storageModifiedHandler);

        this.addEmployeeActionButtonsEvents();
    }

    storageModifiedHandler = (event) =>
    {

        let storage = this.storageManager.getLocalStorageState();

        storage.htmlElements.forEach((elem) =>
        {
            if (!document.querySelector(`#${elem.id}`))
            {

                const createdElement = this.createELement(elem);

                document.querySelector(`#${elem.fatherID}`).appendChild(createdElement);
            }
        });

        this.addEmployeeActionButtonsEvents();
    }

    addEmployeeActionButtonsEvents = () =>
    {
        const rows = document.querySelectorAll('tr:not(#tbl-header-row)');
        if (rows.length)
        {
            rows.forEach(row => row.addEventListener('click', this.rowAddClickActions));
        }
    }

    deleteLocalStorageButtonHandler = (event) =>
    {
        window.localStorage.clear();
        window.location.reload();
    }

    rowAddClickActions = (event) =>
    {
        const actions = {
            'delete': this.employeesManagerIU.deleteEmployee,
            'edit': this.employeesManagerIU.genEditEmployeeForm,
            'default': () => ""
        }

        actions[event.target?.getAttribute("action") || "default"](event);
    }

    addEmployeeFormHandler = (event) =>
    {
        event.preventDefault();

        this.employeesManagerIU.addEmployee(event);

        const modalElement = document.querySelector('#modal-add-employee-id');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();

        Toastify({
            text: 'Empleado agregado con exito',
            duration: 2000,
            close: true,
            gravity: 'bottom',
            position: 'right',
            stopOnFocus: true,
            style: {
                background: "linear-gradient(90deg, rgba(2,0,36,0.7567401960784313) 0%, rgba(9,121,67,0.9556197478991597) 18%, rgba(7,138,102,1) 69%, rgba(0,212,255,0.8575805322128851) 100%);",
            }
        }).showToast();
    }

    checkForDefaultEmployees = async () =>
    {
        try
        {
            const pasteBinCodesResult = await fetch(`./${this.pasteBinEmployeesFileName}.json`);
            const pasteBinCodes = await pasteBinCodesResult.json();

            pasteBinCodes.pasteCodes.forEach(this.pasteCodesHandler);

        }
        catch (error)
        {
            console.error(`Error al obtener empleados de forma remota. ${error}`)
        }
    }

    pasteCodesHandler = async code =>
    {
        try
        {
            let addedEmployees = 0;
            const pasteUrl = `${this.pasteBinApiUrl}/${code}`;
            const employeesByPassCorsResult = await fetch(pasteUrl);

            const employeesBypassedCorsContent = await employeesByPassCorsResult.json();
            const employeesResult = JSON.parse(employeesBypassedCorsContent.contents);


            debugger
            employeesResult.employees.forEach(employee =>
            {
                if (this.employeesManagerIU.addRemoteEmployee(employee))
                {
                    addedEmployees++;
                }
            });

            if (addedEmployees)
            {
                Toastify({
                    text: `Se agregaron ${addedEmployees} empleados de forma remota desde el pasteBin <a href="https://pastebin.com/raw/${code}" class="text-warning" target="_blank">${code}</a>`,
                    duration: 5000,
                    close: true,
                    gravity: 'bottom',
                    position: 'right',
                    stopOnFocus: true,
                    escapeMarkup: false,
                    style: {
                        background: "linear-gradient(90deg, rgba(2,0,36,0.7567401960784313) 0%, rgba(9,121,67,0.9556197478991597) 18%, rgba(7,138,102,1) 69%, rgba(0,212,255,0.8575805322128851) 100%);",
                    }
                }).showToast();
            }
        }
        catch (error)
        {
            console.error(`Error al obtener los empleados del codigo: ${code}. ${error}`)
        }
    }

}   