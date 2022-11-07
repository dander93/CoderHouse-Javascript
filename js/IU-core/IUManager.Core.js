class IUManagerCore {

    employeesManagerIU;
    employeesTimeManagerIU;

    messageHelper;

    constructor() {
        this.employeesManagerIU = new EmplyoeesManagerIU();
        this.employeesTimeManagerIU = new EmployeesTimeManagerIU();
        this.messageHelper = new MessageHelper();
    }


    promptMenuOptions = () => {
        const menuMessage =
            `menú principal
        1. Agregar Empleado
        2. Agregar Horas
        3. Modificar Empleado
        4. Modificar Horas de empleados
        5. Limpiar consola
        6. Salir`;

        return this.messageHelper.printMessageAndPrompt(menuMessage);
    }



}