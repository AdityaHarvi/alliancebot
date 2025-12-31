import { Collection, GuildMember, Role } from "discord.js";
import { ERoleType, RoleCache } from "../RoleCache";

export class MemberFunctionLibrary {
    // Public:
    public static doesMemberHaveRole(member: GuildMember, roleType: ERoleType): boolean {
        try {
            if (!member) {
                throw new Error("MemberFunctionLibrary::doesMemberHaveRole: Invalid 'member' provided.");
            }

            const role: Role | null = RoleCache.getInstance().getRoleOfType(roleType);
            if (!role) {
                throw new Error(`MemberFunctionLibrary::doesMemberHaveRole: Invalid 'role' obtained when searching for type ${roleType}`);
            }
    
            const memberRoles: Collection<string, Role> = member.roles.valueOf() as Collection<string, Role>;
            return memberRoles.some(role => role.name === role.name);
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }

    public static isMemberStaff(member: GuildMember) {
        return this.doesMemberHaveRole(member, ERoleType.Admin) || this.doesMemberHaveRole(member, ERoleType.Mod);
    }

    // Private:
    private constructor() {}
}
