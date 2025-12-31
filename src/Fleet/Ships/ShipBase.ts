import { ModalSubmitInteraction } from "discord.js";
import { FleetFunctionLibrary } from "../../Singletons/FunctionLibraries/FleetFunctionLibrary";
import { ErrorMessagingFunctionLibrary } from "../../Singletons/FunctionLibraries/ErrorMessagingFunctionLibrary";

export enum EShipType {
    Sloop = 1,
    Brigantine = 2,
    Galleon = 3
}

export class ShipBase {
    // Public:
    public constructor(shipSymbol: string, newShipActivity: string, newShipId: number) {
        this.playerIds = [];
        this.shipId = newShipId;
        this.maxNumPlayersOnShip = this.tryGetMaxPlayerCount(shipSymbol);
        this.shipType = this.tryGetShipTypeFromMaxPlayerCount(this.maxNumPlayersOnShip);
        this.shipActivity = newShipActivity;
    }

    public addPlayerId(playerId: string, interaction: ModalSubmitInteraction | undefined): void {
        if (this.playerIds.length >= this.maxNumPlayersOnShip) {
            if (interaction !== undefined) {
                ErrorMessagingFunctionLibrary.replyToUserWithError(interaction, "Failed to add user to ship. It is full.");
            }
            return;
        }

        if (this.playerIds.includes(playerId)) {
            return;
        }

        this.playerIds.push(playerId);
    }

    public getPlayerIds(): string[] {
        return this.playerIds;
    }

    public getShipId(): number {
        return this.shipId;
    }

    public getShipActivity(): string {
        return this.shipActivity;
    }

    public getShipType(): EShipType {
        return this.shipType;
    }

    // Private:
    private tryGetMaxPlayerCount(shipStringId: string): number {
        let foundMaxPlayerCount: number | undefined = FleetFunctionLibrary.getFleetTypeData().get(shipStringId);
        return (foundMaxPlayerCount === undefined) ? -1 : foundMaxPlayerCount;
    }

    private tryGetShipTypeFromMaxPlayerCount(maxPlayerCount: number): EShipType {
        const FleetData: Map<string, number> = FleetFunctionLibrary.getFleetTypeData();
        for (const [key, value] of FleetData) {
            if (value === maxPlayerCount) {
                switch (key) {
                    case "s": {
                        return EShipType.Sloop;
                    }

                    case "b": {
                        return EShipType.Brigantine;
                    }

                    case "g": {
                        return EShipType.Galleon;
                    }
                }
            }
        }

        console.log("Failed to determine ship type from provided max player count.");
        return EShipType.Sloop;
    }

    private playerIds: string[];
    private shipType: EShipType;
    private shipActivity: string;
    private shipId: number;
    private maxNumPlayersOnShip: number;
}