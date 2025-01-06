import { ChannelType, GuildChannelManager, GuildBasedChannel, GuildChannelTypes, CategoryChannel, PermissionFlagsBits, RoleManager, Role, OverwriteResolvable } from "discord.js";
import { InitializerInterface } from "./InitializerInterface";
import ChannelData from "../Constants/ChannelData.json";
import RoleData from "../Constants/RoleData.json";

export class ChannelInitializer implements InitializerInterface {
    // Public:
    public constructor(guildID: string, channelManager: GuildChannelManager, roleManager: RoleManager) {
        this.guildID = guildID;
        this.channelManager = channelManager;
        this.roleManager = roleManager;
    }

    // BEGIN: InitialierInterface
    public async executeInitializer(): Promise<void> {
        try {
            let category: GuildBasedChannel | undefined = this.channelManager.cache.find(channel => channel.type == ChannelType.GuildCategory && channel.name === ChannelData.category.categoryName);
            if (category === undefined) {
                category = await this.channelManager.create({
                    name: ChannelData.category.categoryName,
                    type: this.getChannelTypeFromString(ChannelData.category.categoryType),
                    reason: ChannelData.category.reason
                });
            }
    
            for (const newChannelData of ChannelData.channels) {
                // Text channels cannot have upper-cases nor spaces in their names. This ensures the names are 'safe' to use.
                let parsedChannelName: string = newChannelData.channelName;
                if (newChannelData.channelType !== "Voice") {
                    parsedChannelName = this.getSafeChannelName(newChannelData.channelName);
                }
    
                let newChannel: GuildBasedChannel | undefined = this.channelManager.cache.find(channel => channel.name === parsedChannelName);
                if (newChannel === undefined) {
                    newChannel = await this.channelManager.create({
                        name: parsedChannelName,
                        type: this.getChannelTypeFromString(newChannelData.channelType),
                        parent: category as CategoryChannel,
                        reason: newChannelData.reason,
                    });
                }
    
                if (newChannelData.isPrivate) {
                    let permissions: OverwriteResolvable[] = [];
                    permissions.push({
                        id: this.guildID,
                        deny: [PermissionFlagsBits.ViewChannel]
                    });
    
                    RoleData.roles.forEach(currentRoleData => {
                        const foundRole: Role | undefined = this.roleManager.cache.find((role) => role.name === currentRoleData.RoleName);
                        if (foundRole === undefined) {
                            throw new Error(`Failed to find role with name: ${currentRoleData.RoleName}`);
                        }
    
                        permissions.push({
                            id: foundRole.id,
                            allow: [PermissionFlagsBits.ViewChannel]
                        });
                    });
    
                    
                    newChannel.edit({
                        permissionOverwrites: permissions
                    });
                };
            }
            
            console.log("Channel initialization complete.");
        }
        catch (error) {
            console.log(error);
        }
    }
    // END: InitializerInterface

    // Private:
    private getChannelTypeFromString(typeString: string): GuildChannelTypes | undefined {
        try {
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
        catch (error) {
            console.log(error);
            return undefined;
        }
    }

    private getSafeChannelName(channelName: string): string {
        return channelName.replace(" ", "-").toLowerCase();
    }

    private guildID: string;
    private channelManager: GuildChannelManager;
    private roleManager: RoleManager;
}