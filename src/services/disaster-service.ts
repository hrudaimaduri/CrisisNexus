

import { DisasterLocation } from '@/types/disaster';
import { kv } from "@vercel/kv";
import { nanoid } from "nanoid";
import { MonitoredLocation } from "@/context/locations-context";
import { backendService } from "@/services/backend-service";

const currentTime = new Date().toISOString();

// Mock disaster data for development
const mockDisasters: DisasterLocation[] = [
  {
    id: '1',
    type: 'flood',
    severity: 'high',
    location: [19.0760, 72.8777], // Mumbai
    description: 'Severe flooding in Mumbai metropolitan area',
    affectedAreas: ['Dadar', 'Bandra', 'Kurla'],
    evacuationZones: ['Lower Parel', 'Dharavi'],
    safeZones: ['Colaba', 'Malabar Hill'],
    createdAt: currentTime,
    updatedAt: currentTime,
    lastUpdate: currentTime
  },
  {
    id: '2',
    type: 'cyclone',
    severity: 'high',
    location: [13.0827, 80.2707], // Chennai
    description: 'Cyclone warning for coastal Chennai',
    affectedAreas: ['Marina Beach', 'Mylapore', 'T. Nagar'],
    evacuationZones: ['Coastal areas', 'Low-lying regions'],
    safeZones: ['Inner city shelters', 'Government facilities'],
    createdAt: currentTime,
    updatedAt: currentTime,
    lastUpdate: currentTime
  },
  {
    id: '3',
    type: 'earthquake',
    severity: 'medium',
    location: [28.7041, 77.1025], // Delhi
    description: 'Moderate seismic activity detected',
    affectedAreas: ['Old Delhi', 'Central Delhi'],
    evacuationZones: ['Vulnerable structures'],
    safeZones: ['Open grounds', 'Emergency centers'],
    createdAt: currentTime,
    updatedAt: currentTime,
    lastUpdate: currentTime
  },
  {
    id: '4',
    type: 'fire',
    severity: 'high',
    location: [12.9716, 77.5946], // Bangalore
    description: 'Forest fire in outskirts of Bangalore',
    affectedAreas: ['Bannerghatta', 'Electronic City'],
    evacuationZones: ['Forest border areas'],
    safeZones: ['City center', 'Relief camps'],
    createdAt: currentTime,
    updatedAt: currentTime,
    lastUpdate: currentTime
  },
  {
    id: '5',
    type: 'landslide',
    severity: 'medium',
    location: [30.3165, 78.0322], // Dehradun
    description: 'Landslide warning in hilly regions',
    affectedAreas: ['Hill slopes', 'Valley regions'],
    evacuationZones: ['Risk-prone slopes'],
    safeZones: ['Stable ground areas', 'Relief centers'],
    createdAt: currentTime,
    updatedAt: currentTime,
    lastUpdate: currentTime
  }
];

export async function addDisasterLocation(disaster: DisasterLocation): Promise<void> {
  // Implementation for adding new disasters
  if (process.env.NODE_ENV === 'development') {
    mockDisasters.push({
      ...disaster,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastUpdate: new Date().toISOString()
    });
    return;
  }

  // Production implementation to be added later
  throw new Error('Production storage not implemented yet');
}

export async function updateDisasterLocation(id: string, disaster: Partial<DisasterLocation>): Promise<void> {
  // Implementation for updating disasters
  if (process.env.NODE_ENV === 'development') {
    const index = mockDisasters.findIndex(d => d.id === id);
    if (index !== -1) {
      mockDisasters[index] = {
        ...mockDisasters[index],
        ...disaster,
        updatedAt: new Date().toISOString(),
        lastUpdate: new Date().toISOString()
      };
    }
    return;
  }

  // Production implementation to be added later
  throw new Error('Production storage not implemented yet');
}

export async function getDisasterLocation(id: string): Promise<DisasterLocation | null> {
  return await kv.hgetall(`disaster:${id}`) as DisasterLocation | null;
}

export async function getAllDisasterLocations(): Promise<DisasterLocation[]> {
  // In development, return mock data
  if (process.env.NODE_ENV === 'development') {
    return mockDisasters;
  }

  // In production, use Vercel KV (implementation to be added later)
  throw new Error('Production storage not implemented yet');
}

export async function deleteDisasterLocation(id: string): Promise<void> {
  // Implementation for deleting disasters
  if (process.env.NODE_ENV === 'development') {
    const index = mockDisasters.findIndex(d => d.id === id);
    if (index !== -1) {
      mockDisasters.splice(index, 1);
    }
    return;
  }

  // Production implementation to be added later
  throw new Error('Production storage not implemented yet');
}

export interface DisasterAlert {
  id: string;
  locationId: string;
  type: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  source: string;
  timestamp: string;
  status: 'active' | 'resolved';
  sourceUrl?: string;
}

export interface NewsUpdate {
  id: string;
  title: string;
  content: string;
  source: string;
  timestamp: string;
  locationId?: string;
  sourceUrl?: string;
}

class DisasterService {
  private static instance: DisasterService;
  private lastUpdate: string = new Date().toISOString();

  private constructor() {}

  static getInstance(): DisasterService {
    if (!DisasterService.instance) {
      DisasterService.instance = new DisasterService();
    }
    return DisasterService.instance;
  }

  async fetchActiveAlerts(): Promise<DisasterAlert[]> {
    // Fetch active alerts from backendService which now integrates with external APIs
    return backendService.getActiveAlerts();
  }

  async fetchLatestUpdates(): Promise<NewsUpdate[]> {
    // Fetch latest updates from backendService which now integrates with external APIs
    return backendService.getLatestUpdates();
  }

  async fetchAlertHistory(startDate: string, endDate: string): Promise<DisasterAlert[]> {
    // Fetch historical data from backendService which now integrates with external APIs
    return backendService.getAlertHistory(startDate, endDate);
  }

  getLastUpdate(): string {
    return this.lastUpdate;
  }

  updateLastUpdate(): void {
    this.lastUpdate = new Date().toISOString();
  }
}

export const disasterService = DisasterService.getInstance(); 