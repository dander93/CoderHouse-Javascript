/**
 * Private
 * */

const _EMPLOYEES_DIVISOR = "|";
const _EMPLOYEE_PROP_DIVISOR = "#";

let _employees = "";


/**
 * Public
 * */

function addEmployeeMenuOption() {
    do {
        addEmployee();
    } while (window.confirm("¿Desea agregar otro?"));
}

/** 
 * Agrega un empleado a la estructura
 * */
function addEmployee() {

    let id = prompt("ingrese el id del empleado a agregar");
    let name = prompt("Ingrese el nombre del empleado a agregar");

    if (!_employees || !checkEmployeeExists(id)) {
        _employees += `${id}${_EMPLOYEE_PROP_DIVISOR}${name}${_EMPLOYEES_DIVISOR}`;
    }

    printMessage(`Empleados: ${_employees}`);
}

/**
 * Obtiene un empleado por ID
 * @param {string} id
 * */
function checkEmployeeExists(id) {
    let employee = null;

    if (_employees) {
        let employees = getEmployeesList();

        employees.forEach(function (value, index) {

            if (value.split(_EMPLOYEE_PROP_DIVISOR)[0] === id) {
                employee = value;
            }
        });
    }

    return employee;
}

function getEmployeesList() {
    let employeesList = null;
    if(_employees){
        employeesList = _employees.split(_EMPLOYEES_DIVISOR);
        //quitamos el elemento que queda de más producto de la estructura (el '|' final)
        employeesList.pop();
    }

    return employeesList;
}

function getEmployeesListForMenuMessage(dataDivisor){

    let employeesMenuMessage = "";
    let employees = getEmployeesList();

    if(employees){
        employees.forEach(function(value,index){
            printMessage(value)
            employeesMenuMessage += ` ${index}. ${value.split(_EMPLOYEE_PROP_DIVISOR)[1]} \n`
        });


        employeesMenuMessage+= `${dataDivisor}`;

        employees.forEach(function(value,index){
            employeesMenuMessage+= `${value.split(_EMPLOYEE_PROP_DIVISOR)[0]}${_EMPLOYEE_PROP_DIVISOR}`
        });
    }

    return employeesMenuMessage;
}

//TODO pendiente de modificar
function modifyEmployeeMenuOption(){
    notImplementedMessageAlert();
}