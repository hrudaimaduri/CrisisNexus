"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useLocations, MonitoredLocation } from "@/context/locations-context";
import type { Map as LeafletMap, Control, DomUtil } from "leaflet";

// Disaster type icons mapping
const disasterIcons: Record<string, string> = {
  "Flood": "🌊",
  "Earthquake": "🏚️",
  "Heavy Rain": "🌧️",
  "Cyclone": "🌀",
  "Heatwave": "🔥",
  "None": "✅"
};

export default function MapView() {
  const { locations } = useLocations();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<any[]>([]);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  
  // Effect for initial map setup - runs only once
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;
    let isMounted = true;
    
    const loadMap = async () => {
      if (!mapRef.current || mapInstanceRef.current) return;
      
      try {
        // Dynamically import leaflet
        const L = (await import('leaflet')).default;
        
        if (!isMounted) return;
        
        // Create map instance
        const map = L.map(mapRef.current, { scrollWheelZoom: false }).setView([23.5937, 78.9629], 5); // Center of India
        
        // Add map tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Create legend control
        const legend = new L.Control({ position: 'bottomright' });

        legend.onAdd = (map: LeafletMap) => {
          const div = L.DomUtil.create('div', 'legend bg-background/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border');
          div.innerHTML = `
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <span class="text-lg">🌊</span>
                <span class="text-sm font-medium">Flood</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-lg">🏚️</span>
                <span class="text-sm font-medium">Earthquake</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-lg">🌧️</span>
                <span class="text-sm font-medium">Heavy Rain</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-lg">🌀</span>
                <span class="text-sm font-medium">Cyclone</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-lg">🔥</span>
                <span class="text-sm font-medium">Heatwave</span>
              </div>
            </div>
          `;
          return div;
        };

        legend.addTo(map);
        
        mapInstanceRef.current = map;
        setLeafletLoaded(true);
        map.scrollWheelZoom.enable(); // Enable scroll wheel zoom after map is fully loaded
      } catch (error) {
        console.error("Error loading map:", error);
      }
    };
    
    loadMap();
    
    // Cleanup function
    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        setLeafletLoaded(false);
      }
    };
  }, []); // Empty dependency array - only run once on mount
  
  // Effect for updating markers when locations change
  useEffect(() => {
    if (!leafletLoaded || !mapInstanceRef.current) return;
    
    const updateMarkers = async () => {
      try {
        const L = (await import('leaflet')).default;
        const map = mapInstanceRef.current;
        if (!map) return;
        
        // Clear existing markers
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];
        
        // Add new markers
        locations.forEach((location: MonitoredLocation) => {
          if (location.lat && location.lng) {
            const markerColor = getMarkerColor(location.status);
            const disasterType = location.disasterType || "None";
            const disasterIcon = disasterIcons[disasterType] || "✅";
            
            // Create custom marker icon with color based on risk level
            const icon = L.divIcon({
              className: 'custom-marker-icon',
              html: `
                <div class="relative">
                  <div class="w-8 h-8 rounded-full ${markerColor.background} border-2 ${markerColor.border} flex items-center justify-center text-base">
                    ${disasterIcon}
                    ${location.activeAlerts > 0 ? 
                      `<div class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-bold">${location.activeAlerts}</div>` 
                      : ''}
                  </div>
                </div>
              `,
              iconSize: [32, 32],
              iconAnchor: [16, 16],
            });
            
            // Create marker and add it to map
            const marker = L.marker([location.lat, location.lng], { icon }).addTo(map);
            
            // Add popup with location details
            marker.bindPopup(`
              <div class="text-center p-2">
                <strong class="text-lg flex items-center justify-center gap-2">${disasterIcon} ${location.name}</strong><br>
                <span class="text-sm ${markerColor.text}">${location.status}</span><br>
                ${disasterType !== "None" ? 
                  `<div class="mt-2 mb-1">
                    <span class="font-medium">${disasterIcon} ${disasterType}</span><br>
                    <span class="text-xs">${location.disasterDescription || ''}</span>
                  </div>` : 
                  '<span class="text-xs text-green-600">No active disasters</span>'}
                <hr class="my-2">
                <span class="text-xs text-gray-500">Last updated: ${location.lastUpdate}</span>
              </div>
            `, { maxWidth: 250 });
            
            markersRef.current.push(marker);
          }
        });
      } catch (error) {
        console.error("Error updating markers:", error);
      }
    };
    
    updateMarkers();
  }, [locations, leafletLoaded]);
  
  // Helper function to get marker colors based on risk level
  const getMarkerColor = (status: string) => {
    switch(status) {
      case "High Risk": 
        return { 
          background: "bg-red-500", 
          border: "border-red-600",
          text: "text-red-600"
        };
      case "Medium Risk": 
        return { 
          background: "bg-amber-400", 
          border: "border-amber-500",
          text: "text-amber-600"
        };
      case "Safe": 
        return { 
          background: "bg-green-500", 
          border: "border-green-600",
          text: "text-green-600"
        };
      default: 
        return { 
          background: "bg-blue-500", 
          border: "border-blue-600",
          text: "text-blue-600"
        };
    }
  };
  
  return (
    <Card>
      <CardContent className="p-0">
        <div className="aspect-[16/9] relative bg-slate-100 dark:bg-gray-900 rounded-lg overflow-hidden">
          {/* Map header */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-background/75 backdrop-blur-sm p-4 flex flex-col items-center">
            <h3 className="text-lg font-medium">Interactive Disaster Map</h3>
            <p className="text-muted-foreground text-center text-sm">
              Displaying {locations.length} monitored locations across India
            </p>
          </div>
          
          {/* Map container */}
          <div ref={mapRef} className="w-full h-full" />

          {/* Add custom styles for the legend */}
          <style jsx global>{`
            .legend {
              background: white;
              padding: 10px;
              border-radius: 4px;
              box-shadow: 0 1px 3px rgba(0,0,0,0.2);
            }
            .dark .legend {
              background: #1f2937;
              color: white;
              border-color: #374151;
            }
          `}</style>
        </div>
      </CardContent>
    </Card>
  );
}