import { CacheType, CommandInteraction, MessageFlags } from "discord.js";

export class ErrorMessaging {
    // Public:
    public static getInstance(): ErrorMessaging {
        if (this.instance === undefined) {
            this.instance = new ErrorMessaging();
            return this.instance;
        }

        return this.instance;
    }

    public replyToUserWithError(interaction: CommandInteraction<CacheType>, message: string): void {
        interaction.reply({
            content: message,
            flags: MessageFlags.Ephemeral
        });
    }

    // Private:
    private constructor() {}

    private static instance: ErrorMessaging;
}