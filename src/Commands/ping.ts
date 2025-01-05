import { CommandInteraction, SlashCommandBuilder, userMention } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");

export async function execute(Interaction: CommandInteraction) {
  return Interaction.reply(userMention(Interaction.user.id) + " Test");
}
