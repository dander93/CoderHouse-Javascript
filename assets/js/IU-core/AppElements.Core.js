class AppElements {

    storageManager

    entryPoint = "APP";

    lastEntryAddedIndex = 0;

    constructor() {
        this.storageManager = this.storageManager || new LocalStorageManager();
        this.addDefaultHTMLElements();
        this.defaultHTMLElementAdded = false;
    }


    addDefaultHTMLElements = () => {
        if (!AppElements.defaultHTMLElementAdded) {
            this.defaultHTMLElementAdded = true;
            let storage = JSON.parse(this.storageManager.getLocalStorageState());


            this.addIfNotExistInStorage(new MyHTMLElement("site-title-menu", "h1", "mainEstructure", "Gestion de empleados", null, 0));
            this.addIfNotExistInStorage(new MyHTMLElement("tbl-employee", "table", "mainEstructure", null, "table table-hover", 1));

            //Headers tabla empleados
            this.addIfNotExistInStorage(new MyHTMLElement("tbl-header", "thead", "tbl-employee", null, null, null))
            this.addIfNotExistInStorage(new MyHTMLElement("tbl-header-row", "tr", "tbl-header", null, null, null))
            this.addIfNotExistInStorage(new MyHTMLElement("id-employee-head", "th", "tbl-header-row", "ID Empleado", null, null))
            this.addIfNotExistInStorage(new MyHTMLElement("name-employee-head", "th", "tbl-header-row", "Nombre Empleado", null, null))
            this.addIfNotExistInStorage(new MyHTMLElement("time-employee-head", "th", "tbl-header-row", "Tiempo Empleado", null, null))

            //body tabla empleados
            this.addIfNotExistInStorage(new MyHTMLElement("tbl-body", "tbody", "tbl-employee", null, "table-striped", null))
            // this.addIfNotExistInStorage(new MyHTMLElement("tbl-body-row", "tr", "tbl-body", null, null, null))

            //extra buttons
            // this.addIfNotExistInStorage(new MyHTMLElement("btn-borrar-storage", "button", "mainEstructure", "borrar storage", null, 6));
            this.addIfNotExistInStorage(new MyHTMLElement("btn-container", "div", "mainEstructure", null, "container-md center", 5))
            this.addIfNotExistInStorage(new MyHTMLElement("btn-add-employee", "button", "btn-container", "Agregar empleado", "btn btn-primary", 6, `data-bs-toggle="modal" data-bs-target="#staticBackdrop"`));
            // this.addIfNotExistInStorage(new MyHTMLElement("btn-reload", "button", "btn-container", "Recargar", "btn btn-link", 10));

            // storage.htmlElements = storage.htmlElements.sort((primerElemento, segundoElemento) => primerElemento - segundoElemento);
        }
    }

    getStoragedAppElements = () => JSON.parse(this.storageManager.getLocalStorageState());

    addIfNotExistInStorage(elem) {

        let storage = JSON.parse(this.storageManager.getLocalStorageState());

        if (!storage.htmlElements.some(storagedItem => storagedItem.id === elem.id)) {
            storage.htmlElements.push(elem)
        }
        this.storageManager.setActualStorageState(storage);
        this.populateTable(storage.htmlElements[0].fatherID)
    }

    populateTable = (arrayElementsToAdd) => {
        let storage = JSON.parse(this.storageManager.getLocalStorageState())

        let table = document.querySelector("tbody");


    }



}

