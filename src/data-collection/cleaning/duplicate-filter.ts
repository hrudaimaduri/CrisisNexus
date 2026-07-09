import { DisasterRecord } from "../models/disaster-record";

export class DuplicateFilter {

    static remove(records: DisasterRecord[]): DisasterRecord[] {

        const unique = new Map<string, DisasterRecord>();

        for (const record of records) {
            unique.set(record.id, record);
        }

        return Array.from(unique.values());
    }
}