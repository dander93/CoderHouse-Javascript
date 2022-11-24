class IUManagerCore
{

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
        let storage = this.appElements.getStoragedAppElements();
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

        this.storageManager.setActualStorageState(storage);
        this.addDefaultEvents();
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
        document.querySelector("#btn-submit-employee")?.addEventListener('click', (event) => this.employeesManagerIU.addEmployee(event));

        document.querySelector("#btn-borrar-storage")?.addEventListener("click", (event) => window.localStorage.clear());

        document.querySelector("#btn-reload")?.addEventListener("click", (event) => window.location.reload());

        window.addEventListener("storaged", (event) =>
        {
            let storage = JSON.parse(this.storageManager.getLocalStorageState());

            storage.htmlElements.forEach((elem) =>
            {
                if (!document.querySelector(`#${elem.id}`))
                {
                    document.querySelector(`#${elem.fatherID}`).appendChild(this.createELement(elem));
                }
            });

        });
    }
}   