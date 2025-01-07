import { CommandInteraction, InteractionResponse, SlashCommandBuilder } from "discord.js";
import { ErrorMessagingFunctionLibrary } from "../Singletons/FunctionLibraries/ErrorMessagingFunctionLibrary";

export abstract class CommandBase {
    // Public:
    public constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    public async execute(interaction: CommandInteraction): Promise<InteractionResponse<boolean>> {
        return ErrorMessagingFunctionLibrary.replyToUserWithError(interaction, "ERROR: Unhanded action.");
    }

    public getData(): SlashCommandBuilder {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description);
    }

    public getName(): string {
        return this.name;
    }

    // Private:
    private name: string;
    private description: string;
}