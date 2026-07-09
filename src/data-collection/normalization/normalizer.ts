import { DisasterRecord } from "../models/disaster-record";
import { SeverityNormalizer } from "./severity-normalizer";

export class Normalizer {

    static normalize(records: DisasterRecord[]): DisasterRecord[] {

        return records.map(record => ({

            ...record,

            severity: SeverityNormalizer.normalize(record.severity)

        }));

    }

}