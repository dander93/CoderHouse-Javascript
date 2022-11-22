/*
 * Private
 * */
const EPLOYEES_TIME_DIVISOR = "|";
const EMPLOYEE_TIME_PROP_DIVISOR = "#";

const EMPLOYEES_LIST_MENU_DATA_DIVISOR = "*";

let _employeesTime = "";

/*
 * Public
 * */

//TODO pendiente de refactorizar
function addEmployeeTimeMenuOption() {

    do {

        let employeesMenuInfo = getEmployeesListForMenuMessage(EMPLOYEES_LIST_MENU_DATA_DIVISOR);

        let employeesMenuData = employeesMenuInfo.split(EMPLOYEES_LIST_MENU_DATA_DIVISOR);

        let choosenEmployee = parseInt(printMessageAndPrompt(employeesMenuData[0]));

        let hours = parseFloat(printMessageAndPrompt("¿Cuantas horas desea agregar?"))

        let employID = employeesMenuData[1].split(EPLOYEES_TIME_DIVISOR)[0].split(EMPLOYEE_TIME_PROP_DIVISOR)[choosenEmployee];

        printMessage(`Agrego ${hours} horas a ${employeesMenuData[0].split('\n')[choosenEmployee]} con id ${employID}`)

        addEmployeeHours(employID, hours);

    } while (window.confirm("¿Desea agregar mas?"))
}

//TODO pendiente de refactorizar agregando funcionalidad de modificar
function addEmployeeHours(employeeID, hours) {

    if (checkEmployeeExists(employeeID)) {
        let employeeTime = getEmployeeHoursByID(employeeID);

        if (employeeTime) {
            modifyEmployeeTimeMenuOption();
            // let employeeProps = employee.split(EMPLOYEE_TIME_PROP_DIVISOR);

            // employeeProps[1] = parseFloat(employeeProps[1]) + parseFloat(hours);

            // employeeTime = `${employeeProps[0]}${EMPLOYEE_TIME_PROP_DIVISOR}${employeeProps[1]}${EPLOYEES_TIME_DIVISOR}`;

        } else {
            _employeesTime += `${employeeID}${EMPLOYEE_TIME_PROP_DIVISOR}${hours}${EPLOYEES_TIME_DIVISOR}`;
        }
    }

    printMessage(_employeesTime);
}

function getEmployeesHoursList() {
    return _employeesTime.split(EPLOYEES_TIME_DIVISOR);
}

function getEmployeeHoursByID(employeeID) {
    let employeeTime = null;

    if (_employeesTime) {
        let employeesHours = getEmployeesHoursList();

        for (let index = 0; index < employeesHours.length; ++index) {
            if (employeesHours[index].split(EMPLOYEE_TIME_PROP_DIVISOR)[0] === employeeID) {
                employeeTime = employeesHours[index];
            }
        }
    }

    return employeeTime;
}

//TODO pendiente de implementar
function modifyEmployeeTimeMenuOption(){
    printMessageAndAlert("No implementado todavía");
}