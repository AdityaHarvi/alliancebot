import { CommandInteraction, InteractionResponse, MessageFlags } from "discord.js";

export class ErrorMessagingFunctionLibrary {
    // Public:
    public static replyToUserWithError(interaction: CommandInteraction, message: string): Promise<InteractionResponse<boolean>> {
        return interaction.reply({
            content: message,
            flags: MessageFlags.Ephemeral
        });
    }
}