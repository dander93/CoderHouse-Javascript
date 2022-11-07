class EmplyoeesManagerIU {

    getEmployeeData = () => 
        new Employee(
            prompt("Ingrese el ID del empleado"),
            prompt("Ingrese el NOMBRE del empleado"),
            prompt("Ingrese el APELLIDO del empleado"));
    
}