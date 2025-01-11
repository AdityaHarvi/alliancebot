export class ModalManagerSingleton {
    // Public:
    public static getInstance() {
        if (this.instance === undefined) {
            this.instance = new ModalManagerSingleton();
            return this.instance;
        }

        return this.instance;
    }

    public getCommandFromName(name: string): CommandBase | undefined {
        return this.nameToCommandMap.get(name);
    }

    // Private:
    private constructor() {
        this.nameToCommandMap = new Map<string, CommandBase>();
    }

    private addCommandToMap<commandClass extends CommandBase>(classToCreate: new () => commandClass) {
        const instance: CommandBase = new classToCreate();
        this.nameToCommandMap.set(instance.getName(), instance);
    }

    private static instance: ModalManagerSingleton;
    private activeModalIds: ;
}
