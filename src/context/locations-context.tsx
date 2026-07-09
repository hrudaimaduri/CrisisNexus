"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type LocationStatus = "High Risk" | "Medium Risk" | "Safe";
type DisasterType = "Flood" | "Earthquake" | "Heavy Rain" | "Cyclone" | "Heatwave" | "None";

export interface MonitoredLocation {
  name: string;
  activeAlerts: number;
  lastUpdate: string;
  status: LocationStatus;
  statusColor: string;
  disasterType?: DisasterType; // Type of disaster (if any)
  disasterDescription?: string; // Additional details about the disaster
  lat?: number; // Optional latitude
  lng?: number; // Optional longitude
}

interface LocationsContextType {
  locations: MonitoredLocation[];
  addLocation: (locationName: string) => boolean;
  removeLocation: (locationName: string) => void;
  updateLocationDisaster: (locationName: string, disasterType: DisasterType, description?: string) => void;
  hasLoaded: boolean;
}

// City coordinates data - used for map display
const cityCoordinates: Record<string, [number, number]> = {
  "New Delhi": [28.6139, 77.2090],
  "Mumbai": [19.0760, 72.8777],
  "Bangalore": [12.9716, 77.5946],
  "Hyderabad": [17.3850, 78.4867],
  "Chennai": [13.0827, 80.2707],
  "Kolkata": [22.5726, 88.3639],
  "Pune": [18.5204, 73.8567],
  "Ahmedabad": [23.0225, 72.5714],
  "Jaipur": [26.9124, 75.7873],
  "Lucknow": [26.8467, 80.9462]
};

const defaultLocations: MonitoredLocation[] = [
  {
    name: "New Delhi",
    activeAlerts: 2,
    lastUpdate: "35 minutes ago",
    status: "High Risk",
    statusColor: "text-red-600 bg-red-50",
    disasterType: "Flood",
    disasterDescription: "Yamuna River overflowing, affecting eastern areas",
    lat: 28.6139,
    lng: 77.2090
  },
  {
    name: "Mumbai",
    activeAlerts: 1,
    lastUpdate: "2 hours ago",
    status: "Medium Risk",
    statusColor: "text-amber-600 bg-amber-50",
    disasterType: "Heavy Rain",
    disasterDescription: "Continuous rainfall causing local flooding in low-lying areas",
    lat: 19.0760,
    lng: 72.8777
  },
  {
    name: "Bangalore",
    activeAlerts: 0,
    lastUpdate: "1 day ago",
    status: "Safe",
    statusColor: "text-green-600 bg-green-50",
    disasterType: "None",
    lat: 12.9716,
    lng: 77.5946
  },
];

const LocationsContext = createContext<LocationsContextType | undefined>(undefined);

export function LocationsProvider({ children }: { children: ReactNode }) {
  // Start empty on SSR to avoid hydration mismatch; load on client after mount
  const [locations, setLocations] = useState<MonitoredLocation[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Load from localStorage or defaults on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLocations = localStorage.getItem("monitoredLocations");
      const initial = savedLocations ? JSON.parse(savedLocations) : defaultLocations;
      setLocations(initial);
      setHasLoaded(true);
    }
  }, []);

  // Save locations to localStorage whenever they change (after initial load)
  useEffect(() => {
    if (typeof window !== "undefined" && hasLoaded) {
      localStorage.setItem("monitoredLocations", JSON.stringify(locations));
    }
  }, [locations, hasLoaded]);

  const addLocation = (locationName: string) => {
    // Extract just the city name without state/region
    const cityName = locationName.split(",")[0].trim();
    
    // Check if location already exists
    if (locations.some(loc => loc.name.toLowerCase() === cityName.toLowerCase())) {
      return false;
    }

    // Get coordinates for this city if available
    const [lat, lng] = cityCoordinates[cityName] || [20.5937, 78.9629]; // Default to center of India

    // Create a new location with default values
    const newLocation: MonitoredLocation = {
      name: cityName,
      activeAlerts: 0,
      lastUpdate: "Just now",
      status: "Safe",
      statusColor: "text-green-600 bg-green-50",
      disasterType: "None",
      lat,
      lng
    };

    setLocations(prev => [...prev, newLocation]);
    return true;
  };

  const removeLocation = (locationName: string) => {
    setLocations(prev => prev.filter(loc => loc.name !== locationName));
  };

  const updateLocationDisaster = (locationName: string, disasterType: DisasterType, description?: string) => {
    setLocations(prev => 
      prev.map(loc => {
        if (loc.name === locationName) {
          // Determine status based on disaster type
          let newStatus: LocationStatus = "Safe";
          let newStatusColor = "text-green-600 bg-green-50";
          let alertCount = 0;
          
          if (disasterType !== "None") {
            if (["Flood", "Earthquake", "Cyclone"].includes(disasterType)) {
              newStatus = "High Risk";
              newStatusColor = "text-red-600 bg-red-50";
              alertCount = 2;
            } else {
              newStatus = "Medium Risk";
              newStatusColor = "text-amber-600 bg-amber-50";
              alertCount = 1;
            }
          }
          
          return {
            ...loc,
            disasterType,
            disasterDescription: description,
            status: newStatus,
            statusColor: newStatusColor,
            activeAlerts: alertCount,
            lastUpdate: "Just now"
          };
        }
        return loc;
      })
    );
  };

  return (
    <LocationsContext.Provider 
      value={{ 
        locations, 
        addLocation, 
        removeLocation,
        updateLocationDisaster,
        hasLoaded
      }}
    >
      {children}
    </LocationsContext.Provider>
  );
}

export function useLocations() {
  const context = useContext(LocationsContext);
  if (context === undefined) {
    throw new Error("useLocations must be used within a LocationsProvider");
  }
  return context;
} 