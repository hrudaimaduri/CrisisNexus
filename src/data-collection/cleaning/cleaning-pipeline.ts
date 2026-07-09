import { DisasterRecord } from "../models/disaster-record";
import { DataValidator } from "./validator";
import { DuplicateFilter } from "./duplicate-filter";

export class CleaningPipeline {

    static clean(records: DisasterRecord[]): DisasterRecord[] {

        const validRecords = records.filter(DataValidator.validate);

        return DuplicateFilter.remove(validRecords);

    }

}