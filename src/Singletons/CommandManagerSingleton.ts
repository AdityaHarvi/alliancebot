import { CommandBase } from "../Commands/CommandBase";
import { QueueCreate } from "../Commands/QueueCreate";
import fs from "fs";

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
        return this.commandList;
    }

    public getCommandFromName(name: string): CommandBase | undefined {
        return this.commandList.find(command => command.getName() === name);
    }

    // Private:
    private constructor() {
        this.commandList = [];
        this.commandList.push(new QueueCreate());

        // fs.readdirSync("src/Commands/").forEach(file => {
        //     const newCommand: CommandBase = require(`../Commands/${file}`);
        //     if (newCommand.getName() === "") { return; }

        //     newCommand.constructor;

        //     this.commandList.push(new newCommand);
        // });
    }

    private static instance: CommandManagerSingleton;
    private commandList: CommandBase[];
}