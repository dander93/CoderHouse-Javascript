class LocalStorageManager
{

    static localStoragetKey = "employeesDasboard";

    storageEvent

    constructor()
    {
        this.storageEvent = this.storageEvent || new Event("storaged");
        this.createStorage();
    }

    getLocalStorageState = () => window.localStorage.getItem(LocalStorageManager.localStoragetKey);

    setActualStorageState = (storage) =>
    {
        window.localStorage.setItem(LocalStorageManager.localStoragetKey, JSON.stringify(storage));
        window.dispatchEvent(this.storageEvent);
    }


    createStorage = () =>
    {
        const storageResult = window.localStorage.getItem(LocalStorageManager.localStoragetKey)

        if (!storageResult)
        {
            this.setDefaultStorage()
        }
    }



    setDefaultStorage = () =>
    {

        const defaultLocalStorageStructure = {
            employees: [],
            employeesTime: [],
            htmlElements: []
        }

        window.localStorage.setItem(LocalStorageManager.localStoragetKey, JSON.stringify(defaultLocalStorageStructure))
    }


}