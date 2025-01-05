import { ChannelType, GuildChannelManager, GuildBasedChannel, GuildChannelTypes, CategoryChannel } from "discord.js";
import { InitializerInterface } from "./InitializerInterface";
import ChannelData from "../Constants/ChannelData.json";

export class ChannelInitializer implements InitializerInterface {
    // Public:
    public constructor(channelManager: GuildChannelManager) {
        this.channelManager = channelManager;
    }

    // BEGIN: InitialierInterface
    public executeInitializer(): void {
        this.generateAllianceChannels();
        console.log("Channel initialization complete.");
    }
    // END: InitializerInterface

    // Private:
    private async generateAllianceChannels(): Promise<void> {
        let category: GuildBasedChannel | undefined = this.channelManager.cache.find(channel => channel.type == ChannelType.GuildCategory && channel.name === ChannelData.category.categoryName);
        if (category === undefined) {
            category = await this.channelManager.create({
                name: ChannelData.category.categoryName,
                type: this.getChannelTypeFromString(ChannelData.category.categoryType),
                reason: ChannelData.category.reason
            });
        }

        ChannelData.channels.forEach(async channelToCreate => {
            // Text channels cannot have upper-cases nor spaces in their names. This ensures the names are 'safe' to use.
            let parsedChannelName: string = channelToCreate.channelName;
            if (channelToCreate.channelType !== "Voice") {
                parsedChannelName = this.getSafeChannelName(channelToCreate.channelName);
            }
            
            let foundChannel: GuildBasedChannel | undefined = this.channelManager.cache.find(channel => channel.name === parsedChannelName);
            if (foundChannel === undefined) {
                foundChannel = await this.channelManager.create({
                    name: parsedChannelName,
                    type: this.getChannelTypeFromString(channelToCreate.channelType),
                    parent: category as CategoryChannel,
                    reason: channelToCreate.reason,
                });
            }
        });
    }

    private getChannelTypeFromString(typeString: string): GuildChannelTypes {
        switch (typeString) {
            case "Category": {
                return ChannelType.GuildCategory;
            }

            case "Text": {
                return ChannelType.GuildText;
            }

            case "Voice": {
                return ChannelType.GuildVoice;
            }
        }

        throw new Error("Invalid channel 'type' string obtained. Failed to create appropriate channel.");
    }

    private getSafeChannelName(channelName: string): string {
        return channelName.replace(" ", "-").toLowerCase();
    }

    private channelManager: GuildChannelManager;
}