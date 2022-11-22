class LocalStorageManager {

    static localStoragetKey = "employeesDasboard";

    constructor() {
        this.createStorage();
    }

    getLocalStorageState = () => window.localStorage.getItem(LocalStorageManager.localStoragetKey);

    setActualStorageState = (storage) => window.localStorage.setItem(LocalStorageManager.localStoragetKey, JSON.stringify(storage));


    createStorage = () => {
        const storageResult = window.localStorage.getItem(LocalStorageManager.localStoragetKey)

        if (!storageResult) {
            this.setDefaultStorage()
        }
    }



    setDefaultStorage = () => {

        const defaultLocalStorageStructure = {
            employees: [],
            employeesTime: [],
            htmlElements: []
        }

        window.localStorage.setItem(LocalStorageManager.localStoragetKey, JSON.stringify(defaultLocalStorageStructure))
    }


}