export type DisasterType = 'flood' | 'earthquake' | 'cyclone' | 'fire' | 'landslide';

export type DisasterSeverity = 'high' | 'medium' | 'low';

export interface DisasterLocation {
  id: string;
  type: DisasterType;
  location: [number, number]; // [latitude, longitude]
  severity: DisasterSeverity;
  description: string;
  affectedAreas: string[];
  evacuationZones: string[];
  safeZones: string[];
  lastUpdate: string;
  createdAt: string;
  updatedAt: string;
}

export interface DisasterTypeInfo {
  icon: string;
  color: string;
  label: string;
} 