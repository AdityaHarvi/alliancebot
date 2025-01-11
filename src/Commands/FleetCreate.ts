import { ActionRowBuilder, CommandInteraction, GuildMember, ModalActionRowComponentBuilder, ModalBuilder, ModalSubmitInteraction, TextInputBuilder, TextInputStyle } from "discord.js";
import { ERoleTypes } from "../Singletons/RoleCache";
import { ErrorMessagingFunctionLibrary } from "../Singletons/FunctionLibraries/ErrorMessagingFunctionLibrary";
import { MemberFunctionLibrary } from "../Singletons/FunctionLibraries/MemberFunctionLibrary";
import { CommandBase } from "./CommandBase";
import FleetData from "../Constants/FleetData.json";

export class FleetCreate extends CommandBase {
    // Public:
    public constructor() {
        super("fleetcreate", "Launches the fleet creation tool. Only accessible by admins.");
    }

    public override async execute(interaction: CommandInteraction): Promise<void> {
        if (!interaction.guild) {
            ErrorMessagingFunctionLibrary.replyToUserWithError(interaction, "Please try again later.");
            return;
        }
    
        if (!interaction.member) {
            ErrorMessagingFunctionLibrary.replyToUserWithError(interaction, "Invalid member data. Please try again later.");
            return;
        }
    
        if (!MemberFunctionLibrary.doesMemberHaveRole(interaction.member as GuildMember, ERoleTypes.Admin)) {
            ErrorMessagingFunctionLibrary.replyToUserWithError(interaction, "Only Admins can execute this command.");
            return;
        }
    
        const modal: ModalBuilder = new ModalBuilder()
            .setCustomId(this.name)
            .setTitle("Fleet Creation Tool");

        const shipTypesInput: TextInputBuilder = new TextInputBuilder()
            .setCustomId(`${this.name}-shipTypeInput`)
            .setLabel("Ship Types:")
            .setMaxLength(9)
            .setMinLength(3)
            .setPlaceholder("Use space-separated characters (s,b,g) to list the type and number of ships in the fleet (max of 5).")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

        const shipActivityInput: TextInputBuilder = new TextInputBuilder()
            .setCustomId(`${this.name}-shipActivityInput`)
            .setLabel("Ship Activities:")
            .setMinLength(3)
            .setPlaceholder("Use space-separated characters to list the activity of each ship.")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);
        
        const firstRow: ActionRowBuilder<ModalActionRowComponentBuilder> = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(shipTypesInput);
        const secondRow: ActionRowBuilder<ModalActionRowComponentBuilder> = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(shipActivityInput);

        modal.addComponents(firstRow, secondRow);

        await interaction.showModal(modal);
    }

    public override async handleModalSubmit(interaction: ModalSubmitInteraction): Promise<void> {
        const shipTypesString: string[] = interaction.fields.getTextInputValue(`${this.name}-shipTypeInput`).toLowerCase().split(" ");
        if (shipTypesString.length < FleetData.minNumShipsInFleet || shipTypesString.length > FleetData.maxNumShipsInFleet) {
            ErrorMessagingFunctionLibrary.replyToUserWithError(interaction, `Attempting to create an invalid number of ships. Expected between 2-5 but received '${shipTypesString.length}'.`);
            return;
        }

        for (let shipType of shipTypesString) {
            if (!FleetData.shipTypes.includes(shipType)) {
                ErrorMessagingFunctionLibrary.replyToUserWithError(interaction, `Invalid ship type provided. Expected values of 's', 'b', or 'g', but received '${shipType}'.`);
                return;
            }
        }

        const shipActivities: string[] = interaction.fields.getTextInputValue(`${this.name}-shipActivityInput`).toLowerCase().split(" ");
        if (shipActivities.length !== shipTypesString.length) {
            ErrorMessagingFunctionLibrary.replyToUserWithError(interaction, `Improper number of activities provided. Expected to see '${shipTypesString.length}' activities, but received '${shipActivities.length}'.`);
            return;
        }

        for (let activity of shipActivities) {
            if (!FleetData.shipActivities.includes(activity)) {
                ErrorMessagingFunctionLibrary.replyToUserWithError(interaction, `Invalid ship activity provided. Expected values of 'fotd', 'we', 'a', 'gh', 'oos', 'm', 'f', 'sk', 'sf', 'tt' but received '${activity}'.`);
                return;
            }
        }

        // FIXME: Make the fleet queue.

        interaction.reply("Complete");
    }
}
