import { CommandInteraction, InteractionResponse, Message, MessageFlags, ModalSubmitInteraction } from "discord.js";

export class ErrorMessagingFunctionLibrary {
    // Public:
    public static replyToUserWithError(interaction: CommandInteraction | ModalSubmitInteraction, message: string): Promise<InteractionResponse<boolean>> {
        return interaction.reply({
            content: `ERROR: ${message}`,
            flags: MessageFlags.Ephemeral
        });
    }
}
