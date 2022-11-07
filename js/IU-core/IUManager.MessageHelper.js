class MessageHelper {

    logType = {
        Error: 1,
        Warn: 2,
        Info: 3
    }

    /**
     * Imprime un determinado tipo de mensaje
     * @param {string} message
     * @param {number} type
     */
    logMessage = (message, type) => {
        switch (type) {
            case this.logType.Warn:
                console.warn(message);
                break;
            case this.logType.Error:
                console.error(message);
                break;
            case this.logType.Info:
            default:
                console.info(message);
        }
    }

    /**
     * Imprime un mensaje de error
     * @param {string} message
     */
    printError = (message) => {
        this.logMessage(message, this.logType.Error);
    }

    /**
     * Imprime un mensaje de advertencia
     * @param {string} message
     */
    printWarn = (message) => {
        this.logMessage(message, this.logType.Warn)
    }

    /**
     * Imprime un mensaje de informacion
     * @param {string} message
     */
    printMessage = (message) => {
        this.logMessage(message, this.logType.Info);
    }

    printMessageAndAlert = (message) => {
        this.logMessage(message, this.logType.Info);
        window.alert(message);
    }

    printMessageAndPrompt = (message) => {
        this.logMessage(message, this.logType.Info);
        return window.prompt(message);
    }


    notImplementedMessageAlert = () => {
        const noImplementadaMessage = "funcionalidad no implementada aun";
        this.printError(noImplementadaMessage);
        window.alert(noImplementadaMessage);
    }

}
