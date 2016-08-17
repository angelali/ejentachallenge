export class WeightEntry {
    weightLbs: number;
    timestamp: number;
}

export class WeightAlert {
    category: string;
    text: string;
    timestamp: number;
}

export class WeightData {
    entries: WeightEntry[];
    alerts: WeightAlert[];
}