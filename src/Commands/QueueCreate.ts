import { CommandInteraction, GuildMember, InteractionResponse, ModalBuilder } from "discord.js";
import { ERoleTypes } from "../Singletons/RoleCache";
import { ErrorMessagingFunctionLibrary } from "../Singletons/FunctionLibraries/ErrorMessagingFunctionLibrary";
import { MemberFunctionLibrary } from "../Singletons/FunctionLibraries/MemberFunctionLibrary";
import { CommandBase } from "./CommandBase";

export class QueueCreate extends CommandBase {
    // Public:
    public constructor() {
        super("queuecreate", "Launches the queue creation tool. Only accessible by admins.");
    }

    public override async execute(interaction: CommandInteraction): Promise<InteractionResponse<boolean>> {
        if (!interaction.guild) {
            return ErrorMessagingFunctionLibrary.replyToUserWithError(interaction, "ERROR: Please try again later.");
        }
    
        if (!interaction.member) {
            return ErrorMessagingFunctionLibrary.replyToUserWithError(interaction, "ERROR: Invalid member data. Please try again later.");
        }
    
        if (!MemberFunctionLibrary.doesMemberHaveRole(interaction.member as GuildMember, ERoleTypes.Admin)) {
            return ErrorMessagingFunctionLibrary.replyToUserWithError(interaction, "Only Admins can execute this command.");
        }
    
        const modal: ModalBuilder = new ModalBuilder({
            customId: `myModal-${interaction.user.id}`,
            title: "Test Modal"
        });
    
        return interaction.reply("Launching queue creation tool.");
    }
}
