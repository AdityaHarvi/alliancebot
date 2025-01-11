import { REST, Routes, SlashCommandBuilder } from "discord.js";
import { config } from "../Config";
import { InitializerInterface } from "./InitializerInterface";
import { CommandManagerSingleton } from "../Singletons/CommandManagerSingleton";

/**
 * Ensures all commands are deployed onto the Guild.
 */
export class CommandInitializer implements InitializerInterface {
    // Public:
    public constructor(guildID: string) {
        this.guildID = guildID;
    }

    // BEGIN: InitializerInterface
    public async executeInitializer(): Promise<void> {
        try {
            const commandsData: SlashCommandBuilder[] = CommandManagerSingleton.getInstance().getCommandList().map((command) => command.getData());
            const rest: REST = new REST({ version: "10" }).setToken(config.DISCORD_TOKEN);

            await rest.put(
                Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, this.guildID),
                {
                    body: commandsData,
                }
            );

            console.log("Reloaded application (/) commands.");
            }
        catch (error) {
            console.error(error);
        }
    }
    // END: InitializerInterface

    // Private:
    private guildID: string;
}
