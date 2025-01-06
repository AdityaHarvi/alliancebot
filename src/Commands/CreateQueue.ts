import { CommandInteraction, GuildMember, SlashCommandBuilder } from "discord.js";
import { ERoleTypes } from "../Singletons/RoleCache";
import { ErrorMessaging } from "../Singletons/ErrorMessaging";
import { MemberFunctionLibrary } from "../Singletons/FunctionLibraries/MemberFunctionLibrary";

export const data = new SlashCommandBuilder()
    .setName("createqueue")
    .setDescription("Launches the queue creation tool. Only accessible by admins.");

export async function execute(interaction: CommandInteraction) {
    if (!interaction.guild) {
        ErrorMessaging.getInstance().replyToUserWithError(interaction, "ERROR: Please try again later.");
        return;
    }

    if (!interaction.member) {
        ErrorMessaging.getInstance().replyToUserWithError(interaction, "ERROR: Invalid member data. Please try again later.");
        return;
    }

    if (!MemberFunctionLibrary.doesMemberHaveRole(interaction.member as GuildMember, ERoleTypes.Admin)) {
        ErrorMessaging.getInstance().replyToUserWithError(interaction, "Only Admins can execute this command.");
        return;
    }

    return interaction.reply("Launching queue creation tool.");
}
