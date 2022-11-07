class EmployeesTimeManagerIU {

    getEmployeeTimeData = () =>
        new EmployeeTime(
            prompt("Ingrese el ID del empleado"),
            parseFloat(prompt("Ingrese la cantidad de horas para el empleado"))
        );
}