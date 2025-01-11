import { Role } from "discord.js";
import RoleData from "../Constants/RoleData.json";

export enum ERoleTypes {
    Admin = 1,
    Mod = 2,
}

export class RoleCache {
    // Public:
    public static getInstance(): RoleCache {
        if (this.instance === undefined) {
            this.instance = new RoleCache();

            return this.instance;
        }

        return this.instance;
    }

    public addRoleToCache(role: Role) {
        this.roleCache.push(role);
    }

    public getRoleOfType(roleType: ERoleTypes): Role | null {
        try {
            const foundRoleData = RoleData.roles.find((role) => role.RoleType === ERoleTypes[roleType]);
            if (foundRoleData === undefined) {
                throw new Error(`No role of type ${ERoleTypes[roleType]} was found.`);
            }
    
            const foundRole: Role | undefined = this.roleCache.find(role => role.name === foundRoleData.RoleName);
            if (foundRole === undefined) {
                throw new Error(`No role with name ${foundRoleData.RoleName} was found.`);
            }
    
            return foundRole;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }

    // Private:
    private constructor() {}

    private static instance: RoleCache;
    private roleCache: Role[] = [];
}
