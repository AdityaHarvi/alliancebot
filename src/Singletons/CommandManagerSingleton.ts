import { CommandBase } from "../Commands/CommandBase";
import { QueueCreate } from "../Commands/QueueCreate";

export class CommandManagerSingleton {
    // Public:
    public static getInstance() {
        if (this.instance === undefined) {
            this.instance = new CommandManagerSingleton();
            return this.instance;
        }

        return this.instance;
    }

    public getCommandList(): CommandBase[] {
        return Array.from(this.nameToCommandMap.values());
    }

    public getCommandFromName(name: string): CommandBase | undefined {
        return this.nameToCommandMap.get(name);
    }

    // Private:
    private constructor() {
        this.nameToCommandMap = new Map<string, CommandBase>();
        this.addCommandToMap(QueueCreate);
    }

    private addCommandToMap<commandClass extends CommandBase>(classToCreate: new () => commandClass) {
        const instance: CommandBase = new classToCreate();
        this.nameToCommandMap.set(instance.getName(), instance);
    }

    private static instance: CommandManagerSingleton;
    private nameToCommandMap: Map<string, CommandBase>;
}