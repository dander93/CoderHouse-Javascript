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
            this.addIfNotExistInStorage(new MyHTMLElement("tbl-employee", "table", "mainEstructure", null, "table table-hover", 1, null, false));

            //Headers tabla empleados
            this.addIfNotExistInStorage(new MyHTMLElement("tbl-header", "thead", "tbl-employee", null, null, null, null, false))
            this.addIfNotExistInStorage(new MyHTMLElement("tbl-header-row", "tr", "tbl-header", null, null, null, null, false))
            this.addIfNotExistInStorage(new MyHTMLElement("id-employee-head", "th", "tbl-header-row", "ID Empleado", null, null, null, false))
            this.addIfNotExistInStorage(new MyHTMLElement("name-employee-head", "th", "tbl-header-row", "Nombre Empleado", null, null, null, false))
            this.addIfNotExistInStorage(new MyHTMLElement("time-employee-head", "th", "tbl-header-row", "Tiempo Empleado", null, null, null, false))
            this.addIfNotExistInStorage(new MyHTMLElement("actions-employee", "th", "tbl-header-row", "Acciones", null, null, null, false))

            //body tabla empleados
            this.addIfNotExistInStorage(new MyHTMLElement("tbl-body", "tbody", "tbl-employee", null, "table-striped", null, null, false))

            //botones
            this.addIfNotExistInStorage(new MyHTMLElement("btn-container", "div", "mainEstructure", null, "container-md center", 5, null, false))
            this.addIfNotExistInStorage(new MyHTMLElement("btn-add-employee", "button", "btn-container", "Agregar empleado", "btn btn-primary mx-2", 6, `data-bs-toggle="modal" data-bs-target="#staticBackdrop"`, false));
            this.addIfNotExistInStorage(new MyHTMLElement("btn-borrar-storage", "button", "btn-container", "borrar storage", "btn btn-danger mx-2", 7, null, false));
            this.addIfNotExistInStorage(new MyHTMLElement("btn-reload", "button", "btn-container", "Recargar", "btn btn-link", 10, null, false));

        }
    }

    getStoragedAppElements = () => JSON.parse(this.storageManager.getLocalStorageState());

    addIfNotExistInStorage(elem)
    {
        let storage = JSON.parse(this.storageManager.getLocalStorageState());

        if (!storage.htmlElements.some(storagedItem => storagedItem.id === elem.id))
        {
            storage.htmlElements.push(elem)
        }

        this.storageManager.setActualStorageState(storage);
    }
}

