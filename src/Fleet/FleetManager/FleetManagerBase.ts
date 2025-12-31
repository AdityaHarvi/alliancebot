import { QueueBase } from "../Queue/QueueBase";
import { ShipBase } from "../Ships/ShipBase";

export class FleetManagerBase {
    // Public:
    constructor() {
        this.ships = [];
        this.queue = new QueueBase();
    }

    // Private:
    private ships: ShipBase[];
    private queue: QueueBase;
}
