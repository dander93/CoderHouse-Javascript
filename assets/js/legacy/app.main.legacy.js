// @ts-check

/*
 * Private
 * */

/*
 * Public
 * */

function printMenuHeader() {
    printMessageAndAlert("Bienvenido al sistema interactivo de control de horas para el desarrollo")
}

function promptMenuOptions() {
    const menuMessage =
        `menú principal
    1. Agregar Empleado
    2. Agregar Horas
    3. Modificar Empleado
    4. Modificar Horas de empleados
    5. Salir`;

    return printMessageAndPrompt(menuMessage);
}

function menuSelection(valor) {
    printMessage(`opcion elegida: ${valor}`);

    switch (valor) {
        case 1:
            addEmployeeMenuOption();
            break;
        case 2:
            addEmployeeTimeMenuOption();
            break;
        case 3:
            modifyEmployeeMenuOption();
            break;
        case 4:
            printMessage("MODIFICAR HORAS DE EMPLEADO");
            break;
        case 5:
            printMessage("Saliendo..")
            break;
        default:
            printError("Opcion no valida");
            return false;
    }

    return true;
}


(function () {

    let validSelection = true;

    do {
        // console.clear();
        printMenuHeader();
        let menuOption = parseInt(promptMenuOptions());

        validSelection = menuSelection(menuOption);

    } while (!validSelection || window.confirm("¿Desea realizar otra operación?"));
})();