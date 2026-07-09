export interface DisasterRecord {
  id: string;

  source: "IMD" | "NDMA" | "AIDR" | "CWC" | "INCOIS" | "NASA";

  title: string;

  description: string;

  disasterType:
    | "Flood"
    | "Cyclone"
    | "Earthquake"
    | "Heatwave"
    | "Fire"
    | "Landslide"
    | "Rainfall"
    | "Other";

  severity:
    | "Low"
    | "Medium"
    | "High"
    | "Critical";

  location: string;

  latitude: number;

  longitude: number;

  issuedAt: string;

  expiresAt?: string;

  url?: string;

  rawData?: unknown;
}