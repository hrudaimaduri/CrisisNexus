import { DisasterRecord } from "../models/disaster-record";

export class DataValidator {

    static validate(record: DisasterRecord): boolean {

        if (!record.title) return false;

        if (!record.location) return false;

        if (!record.source) return false;

        if (!record.disasterType) return false;

        if (!record.severity) return false;

        if (record.latitude === undefined) return false;

        if (record.longitude === undefined) return false;

        return true;
    }

}