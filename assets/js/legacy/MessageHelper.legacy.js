const logType = {
    Error: 1,
    Warn: 2,
    Info: 3
}

/**
 * Imprime un determinado tipo de mensaje
 * @param {string} message
 * @param {number} type
 */
function logMessage(message, type) {
    switch (type) {
        case logType.Warn:
            console.warn(message);
            break;
        case logType.Error:
            console.error(message);
            break;
        case logType.Info:
        default:
            console.info(message);
    }
}

/**
 * Imprime un mensaje de error
 * @param {string} message
 */
function printError(message) {
    logMessage(message, logType.Error);
}

/**
 * Imprime un mensaje de advertencia
 * @param {string} message
 */
function printWarn(message) {
    logMessage(message, logType.Warn)
}

/**
 * Imprime un mensaje de informacion
 * @param {string} message
 */
function printMessage(message) {
    logMessage(message, logType.Info);
}

function printMessageAndAlert(message) {
    logMessage(message, logType.Info);
    window.alert(message);
}

function printMessageAndPrompt(message) {
    logMessage(message, logType.Info);
    return window.prompt(message);
}


function notImplementedMessageAlert() {
    notImplementedMessageAlert();
}