class AppElements
{

    storageManager;

    entryPoint = "APP";

    lastEntryAddedIndex = 0;

    constructor()
    {
        this.storageManager = this.storageManager || new LocalStorageManager();
        this.addDefaultHTMLElements();
        this.defaultHTMLElementAdded = false;
    }


    addDefaultHTMLElements = () =>
    {
        if (!AppElements.defaultHTMLElementAdded)
        {
            this.defaultHTMLElementAdded = true;

            this.addIfNotExistInStorage(new MyHTMLElement("site-title-menu", "h1", "mainEstructure", "Gestion de empleados", "mainEstructure", 0, null, false));
            this.addIfNotExistInStorage(new MyHTMLElement("tbl-employee", "table", "mainEstructure", null, "table table-responsive table-striped table-hover text-center", 1, null, false));
            this.addIfNotExistInStorage(new MyHTMLElement("tbl-employee-caption", "caption", "tbl-employee", "Tabla de control de horario de los empleados", "text-white", 2, null, false));

            //Headers tabla empleados
            this.addIfNotExistInStorage(new MyHTMLElement("tbl-header", "thead", "tbl-employee", null, "table-dark", null, null, false))
            this.addIfNotExistInStorage(new MyHTMLElement("tbl-header-row", "tr", "tbl-header", null, null, null, null, false))
            this.addIfNotExistInStorage(new MyHTMLElement("id-employee-head", "th", "tbl-header-row", "ID Empleado", null, null, `scope="col"`, false))
            this.addIfNotExistInStorage(new MyHTMLElement("name-employee-head", "th", "tbl-header-row", "Nombre Empleado", null, null, `scope="col"`, false))
            this.addIfNotExistInStorage(new MyHTMLElement("time-employee-head", "th", "tbl-header-row", "Tiempo Empleado", null, null, `scope="col"`, false))
            this.addIfNotExistInStorage(new MyHTMLElement("actions-employee", "th", "tbl-header-row", "Acciones", null, null, `scope="col"`, false))

            //body tabla empleados
            this.addIfNotExistInStorage(new MyHTMLElement("tbl-body", "tbody", "tbl-employee", null, "table-striped", null, null, false))

            //botones
            this.addIfNotExistInStorage(new MyHTMLElement("btn-container", "div", "mainEstructure", null, "container-md center", 5, null, false))
            this.addIfNotExistInStorage(new MyHTMLElement("btn-add-employee", "button", "btn-container", "Agregar empleado", "btn btn-primary mx-2", 6, `data-bs-toggle="modal" data-bs-target="#modal-add-employee-id"`, false));

            if (window.location.origin.indexOf("127.0.0.1"))
            {
                this.addIfNotExistInStorage(new MyHTMLElement("btn-borrar-storage", "button", "btn-container", "borrar storage", "btn btn-danger mx-2", 7, null, false));
                this.addIfNotExistInStorage(new MyHTMLElement("btn-reload", "button", "btn-container", "Recargar", "btn link-info text-decoration-none", 10, null, false));
            }

        }
    }

    addIfNotExistInStorage(elem)
    {
        let storage = this.storageManager.getLocalStorageState();

        if (!storage.htmlElements.some(storagedItem => storagedItem.id === elem.id))
        {
            storage.htmlElements.push(elem)
        }

        this.storageManager.setActualStorageState(storage);
    }
}

