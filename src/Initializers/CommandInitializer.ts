import { REST, Routes, SlashCommandBuilder } from "discord.js";
import { config } from "../Config";
import { commands } from "../Commands/Commands";
import { InitializerInterface } from "./InitializerInterface";

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
            const commandsData: SlashCommandBuilder[] = Object.values(commands).map((command) => command.data);
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