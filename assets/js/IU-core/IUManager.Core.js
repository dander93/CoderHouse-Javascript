class IUManagerCore {

    employeesManagerIU;
    employeesTimeManagerIU;
    messageHelper;
    appElements;
    storageManager;
    storagedHttpElements;

    constructor() {
        this.storageManager = this.storageManager || new LocalStorageManager()

        this.employeesManagerIU = this.employeesManagerIU || new EmplyoeesManagerIU();
        // this.employeesTimeManagerIU = this.employeesTimeManagerIU || new EmployeesTimeManagerIU();

        // this.messageHelper = this.messageHelper || new MessageHelper();
        this.appElements = this.appElements || new AppElements();
        this.storagedHttpElements = this.appElements.getStoragedAppElements().htmlElements;
    }

    createPage = () => {

        const entryPoint = document.querySelector(this.appElements.entryPoint);

        const estructure = document.createElement("div")
        estructure.id = "mainEstructure";
        estructure.classList.add("container-md");

        this.storagedHttpElements.map(element => {
            const createdElement = this.createELement(element);
            this.populateChildrens(estructure, createdElement);
        });


        entryPoint.parentNode.replaceChild(estructure, entryPoint);

        this.addDefaultEvents();
    }


    createELement(elem) {
        let createdElement = document.createElement(elem.type)
        createdElement.innerText = elem.text;
        createdElement.id = elem.id;
        createdElement.setAttribute("father-element", elem.fatherID);

        if (elem.classList) {
            createdElement.classList = elem.classList;
        }

        if (elem.optionalPropertys) {
            // elem.optionalPropertys.split(' ').forEach(item => createdElement.setAttribute(item))
            let atributes = elem.optionalPropertys.split(' ').map(attr => attr.split('='));

            atributes.forEach(atribute => createdElement.setAttribute(atribute[0].replaceAll('"', ''), atribute[1].replaceAll('"', '')))
        }

        return createdElement;
    }


    populateChildrens = (estructure, children) => {
        if (children.getAttribute("father-element") === estructure.id) {
            estructure.appendChild(children)
        } else {
            estructure.querySelector(`#${children.getAttribute("father-element")}`).appendChild(children)
        }
    }

    addDefaultEvents = () => {
        document.querySelector("#btn-submit-employee").addEventListener('click', this.employeesManagerIU.addEmployee);
    }
}   