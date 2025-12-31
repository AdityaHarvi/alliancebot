import { CommandInteraction, GuildMember } from "discord.js";
import { ErrorMessagingFunctionLibrary } from "../../Singletons/FunctionLibraries/ErrorMessagingFunctionLibrary";
import FleetData from "../../Constants/FleetData.json";

interface QueueUserData {
    memberInfo: GuildMember;
    activity: string;
    joinTimestamp: number;
}

export class QueueBase {
    // Public:
    public constructror() {
    }

    public addUserToQueueForActivity(interaction: CommandInteraction, user: GuildMember, newActivity: string) {
        if (!user) {
            ErrorMessagingFunctionLibrary.replyToUserWithError(interaction, "Invalid user provided.");
            return;
        }

        if (newActivity === "" || !FleetData.shipActivities.includes(newActivity)) {
            ErrorMessagingFunctionLibrary.replyToUserWithError(interaction, "Invalid activity provided.");
            return;
        }

        const indexOfUser: number = this.getIndexOfUserInQueue(user);
        if (indexOfUser !== -1) {
            // User already exists in queue. Update their activity.
            this.usersInQueue[indexOfUser].activity = newActivity;
        }
        else {
            // User doesn't exist in queue. Generate new entry.
            let newQueueUserData: QueueUserData = {
                memberInfo: user,
                activity: newActivity,
                joinTimestamp: Date.now()
            };

            this.usersInQueue.push(newQueueUserData);
        }

        // FIXME: Update queue presentation.
    }

    public removeUserFromQueue(interaction: CommandInteraction, user: GuildMember) {
        if (!user) {
            ErrorMessagingFunctionLibrary.replyToUserWithError(interaction, "Invalid user provided.");
            return;
        }

        const indexOfUser: number = this.getIndexOfUserInQueue(user);
        if (indexOfUser === -1) {
            ErrorMessagingFunctionLibrary.replyToUserWithError(interaction, "User does not exist in queue.");
            return;
        }

        this.usersInQueue.splice(indexOfUser, 1);
        // FIXME: update queue presentation.
    }

    // Private:
    private getIndexOfUserInQueue(user: GuildMember): number  {
        if (!user) {
            return -1;
        }

        for (let index: number = 0; index < this.usersInQueue.length; index++) {
            if (this.usersInQueue[index].memberInfo === user) {
                return index;
            }
        }

        return -1;
    }

    private usersInQueue: QueueUserData[] = [];
}
