"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const discord_js_1 = require("discord.js");
const config_1 = require("./config");
const commands_1 = require("./commands");
const deploy_commands_1 = require("./deploy-commands");
exports.Bot = new discord_js_1.Client({
    intents: [
        discord_js_1.IntentsBitField.Flags.Guilds,
        discord_js_1.IntentsBitField.Flags.GuildMessages,
        discord_js_1.IntentsBitField.Flags.DirectMessages
    ],
});
exports.Bot.once("ready", () => {
    console.log("Discord bot is ready! 🤖");
});
exports.Bot.on("guildCreate", async (guild) => {
    await (0, deploy_commands_1.deployCommands)({ guildId: guild.id });
});
exports.Bot.on("message", async (message) => {
    console.log(message);
});
exports.Bot.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }
    const { commandName } = interaction;
    if (commands_1.commands[commandName]) {
        commands_1.commands[commandName].execute(interaction);
    }
});
exports.Bot.login(config_1.config.DISCORD_TOKEN);
