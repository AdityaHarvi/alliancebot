import { CommandInteraction, ModalSubmitInteraction, SlashCommandBuilder } from "discord.js";
import { ErrorMessagingFunctionLibrary } from "../Singletons/FunctionLibraries/ErrorMessagingFunctionLibrary";

export abstract class CommandBase {
    // Public:
    public constructor(name: string, description: string) {
        this.name = name.replace(/\s/g, "").toLowerCase();
        this.description = description;
    }

    public async execute(interaction: CommandInteraction): Promise<void> {
        ErrorMessagingFunctionLibrary.replyToUserWithError(interaction, "ERROR: Unhanded action.");
        return;
    }

    public async handleModalSubmit(interaction: ModalSubmitInteraction): Promise<void> {
        ErrorMessagingFunctionLibrary.replyToUserWithError(interaction, "ERROR: Unhanded action.");
        return;
    }

    public getData(): SlashCommandBuilder {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description);
    }

    public getName(): string {
        return this.name;
    }

    // Protected:
    protected name: string;
    protected description: string;
}
