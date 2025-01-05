import { ColorResolvable, Role, RoleManager} from "discord.js";
import { InitializerInterface } from "./InitializerInterface";
import RoleData from "../Constants/RoleData.json";

/**
 * Ensures required roles are added into the Guild.
 */
export class RoleInitializer implements InitializerInterface {
    // Public:
    public constructor(roleManager: RoleManager) {
        this.roleManager = roleManager;
    }

    // BEGIN: InitializerInterface
    public executeInitializer(): void {
        this.validateRoles(this.roleManager);
        console.log("Role initialization complete.");
    }
    // END: InitializerInterface

    // Private:
    private async validateRoles(roleManager: RoleManager): Promise<void> {
        RoleData.roles.forEach(currentRoleData => {
            let foundRole: Role | undefined = roleManager.cache.find(role => role.name === currentRoleData.RoleName);
            if (foundRole === undefined) {
                roleManager.create({
                    name: currentRoleData.RoleName,
                    color: currentRoleData.RoleColor as ColorResolvable,
                    reason: currentRoleData.RoleCreationReason
                });
            }
        });
        
    }

    private roleManager: RoleManager;
}
