import { Client, GatewayIntentBits, Guild, ModalSubmitInteraction } from "discord.js";
import { config } from "./Config";
import { GuildInitializer } from "./Initializers/GuildInitializer";
import { InitializerInterface } from "./Initializers/InitializerInterface";
import { CommandManagerSingleton } from "./Singletons/CommandManagerSingleton";
import { CommandBase } from "./Commands/CommandBase";
import { ErrorMessagingFunctionLibrary } from "./Singletons/FunctionLibraries/ErrorMessagingFunctionLibrary";

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
  ]
});

client.once("ready", async () => {
  console.log("Discord bot is ready! 🤖");

  // FIXME: Remove this after development.
  const guild: Guild | undefined = client.guilds.cache.get("1324800488218169374");

  if (guild === undefined) {
    throw new Error("Undefined guild detected.");
  }

  const guildInitializer: InitializerInterface = new GuildInitializer(guild);
  guildInitializer.executeInitializer();
});

client.on("guildCreate", async (guild) => {
  const guildInitializer: InitializerInterface = new GuildInitializer(guild);
  guildInitializer.executeInitializer();
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const command: CommandBase | undefined = CommandManagerSingleton.getInstance().getCommandFromName(interaction.commandName);
    if (!command) {
      return ErrorMessagingFunctionLibrary.replyToUserWithError(interaction, "Invalid command received.");
    }

    command.execute(interaction);
  }

  if (interaction.isModalSubmit()) {
    const command: CommandBase | undefined = CommandManagerSingleton.getInstance().getCommandFromName(interaction.customId);
    if (!command) {
      return ErrorMessagingFunctionLibrary.replyToUserWithError(interaction, "Invalid command received.");
    }
    
    command.handleModalSubmit(interaction);
  }
});

client.login(config.DISCORD_TOKEN);
