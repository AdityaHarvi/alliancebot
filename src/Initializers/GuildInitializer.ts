import { Guild } from "discord.js";
import { RoleInitializer } from "./RoleInitializer";
import { CommandInitializer } from "./CommandInitializer";
import { InitializerInterface } from "./InitializerInterface";
import { ChannelInitializer } from "./ChannelInitializer";

/**
 * Responsible for initializing the Guild with appropriate data required for the functionality of the bot.
 */
export class GuildInitializer implements InitializerInterface {

    // Public:
    public constructor(guild: Guild) {
        this.subInitializers = [];
        this.subInitializers.push(new RoleInitializer(guild.roles));
        this.subInitializers.push(new CommandInitializer(guild.id));
        this.subInitializers.push(new ChannelInitializer(guild.id, guild.channels, guild.roles));
    }

    // BEGIN: InitializerInterface
    public async executeInitializer(): Promise<void> {
        // Ensure the subInitializers initialize sequentially as certain initializers depend on previous ones.
        for (const initializer of this.subInitializers) {
            await initializer.executeInitializer();
        }
    }
    // END: InitializerInterface

    // Private:
    private subInitializers: InitializerInterface[];
}