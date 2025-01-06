import { ColorResolvable, Role, RoleManager} from "discord.js";
import { InitializerInterface } from "./InitializerInterface";
import RoleData from "../Constants/RoleData.json";
import { RoleCache } from "../Singletons/RoleCache";

/**
 * Ensures required roles are added into the Guild.
 */
export class RoleInitializer implements InitializerInterface {
    // Public:
    public constructor(roleManager: RoleManager) {
        this.roleManager = roleManager;
    }

    // BEGIN: InitializerInterface
    public async executeInitializer(): Promise<void> {
        for (const currentRoleData of RoleData.roles) {
            let foundRole: Role | undefined = this.roleManager.cache.find(role => role.name === currentRoleData.RoleName);
            if (foundRole === undefined) {
                foundRole = await this.roleManager.create({
                    name: currentRoleData.RoleName,
                    color: currentRoleData.RoleColor as ColorResolvable,
                    reason: currentRoleData.RoleCreationReason
                });
            }

            RoleCache.getInstance().addRoleToCache(foundRole);
        }
        
        console.log("Role initialization complete.");
    }
    // END: InitializerInterface

    // Private:
    private roleManager: RoleManager;
}
