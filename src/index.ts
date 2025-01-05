import { Client, GatewayIntentBits, Guild } from "discord.js";
import { config } from "./Config";
import { commands } from "./Commands/Commands";
import { GuildInitializer } from "./Initializers/GuildInitializer";
import { InitializerInterface } from "./Initializers/InitializerInterface";

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
  // FIXME: Undo this after development.
  // await deployCommands({ GuildID: guild.id });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }
  const { commandName } = interaction;
  if (commands[commandName as keyof typeof commands]) {
    commands[commandName as keyof typeof commands].execute(interaction);
  }
});

client.login(config.DISCORD_TOKEN);
