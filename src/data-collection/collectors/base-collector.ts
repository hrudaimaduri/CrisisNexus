import { DisasterRecord } from "../models/disaster-record";

export interface BaseCollector {
  source: string;

  fetchData(): Promise<DisasterRecord[]>;
}