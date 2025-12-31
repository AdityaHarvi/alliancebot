import FleetData from "../../Constants/FleetData.json";

export class FleetFunctionLibrary {
    // Public:
    public static getFleetTypeData(): Map<string, number> {
        if (FleetFunctionLibrary.fleetInfo.size === 0) {
            for (const [key, value] of Object.entries(FleetData.shipTypeData)) {
                FleetFunctionLibrary.fleetInfo.set(key, value);
            }
        }
        
        return FleetFunctionLibrary.fleetInfo;
    }

    // Private:
    private constructor() {}

    private static fleetInfo: Map<string, number> = new Map<string, number>();
}
