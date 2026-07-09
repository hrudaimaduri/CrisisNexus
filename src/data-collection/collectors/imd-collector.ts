import { BaseCollector } from "./base-collector";
import { DisasterRecord } from "../models/disaster-record";

export class IMDCollector implements BaseCollector {
  source = "IMD";

  async fetchData(): Promise<DisasterRecord[]> {
    console.log("Fetching data from IMD...");

    // Temporary mock data
    // Tomorrow we'll replace this with the real IMD API.
    return [
      {
        id: "imd-001",
        source: "IMD",
        title: "Heavy Rainfall Warning",
        description: "Heavy rainfall expected in Hyderabad district.",
        disasterType: "Rainfall",
        severity: "High",
        location: "Hyderabad",
        latitude: 17.385,
        longitude: 78.4867,
        issuedAt: new Date().toISOString(),
        url: "https://mausam.imd.gov.in/",
        rawData: {}
      }
    ];
  }
}