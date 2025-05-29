"use client";

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DisasterLocation, DisasterTypeInfo } from '@/types/disaster';
import { Search } from 'lucide-react';

interface MapComponentProps {
  disasters: DisasterLocation[];
  disasterTypes: Record<string, DisasterTypeInfo>;
  isLoading: boolean;
}

export default function MapComponent({ disasters, disasterTypes, isLoading }: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter disasters based on type and search query
  const filteredDisasters = disasters.filter(disaster => {
    const matchesFilter = activeFilters.length === 0 || activeFilters.includes(disaster.type);
    const matchesSearch = searchQuery === '' || 
      disaster.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disaster.affectedAreas.some(area => area.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize map if it hasn't been initialized yet
      if (!mapRef.current) {
        mapRef.current = L.map('disaster-map', {
          minZoom: 4,
          maxZoom: 12,
          zoomControl: false // We'll add custom zoom control
        }).setView([20.5937, 78.9629], 5);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          minZoom: 4,
          maxZoom: 12,
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapRef.current);

        // Add zoom controls
        L.control.zoom({
          position: 'bottomright'
        }).addTo(mapRef.current);

        // Initialize markers layer group
        markersLayerRef.current = L.layerGroup().addTo(mapRef.current);
      }

      // Clear existing markers
      if (markersLayerRef.current) {
        markersLayerRef.current.clearLayers();
      }

      // Add disaster markers
      filteredDisasters.forEach(disaster => {
        const disasterInfo = disasterTypes[disaster.type];
        
        // Create impact radius circle with zoom-based scaling
        const getRadius = () => {
          const currentZoom = mapRef.current?.getZoom() || 5;
          const baseRadius = disaster.severity === 'high' ? 50000 : 
                           disaster.severity === 'medium' ? 30000 : 15000;
          return baseRadius * Math.pow(0.5, currentZoom - 5); // Scale radius based on zoom level
        };
        
        const circle = L.circle(disaster.location, {
          radius: getRadius(),
          color: disaster.severity === 'high' ? '#ef4444' : 
                 disaster.severity === 'medium' ? '#f59e0b' : '#22c55e',
          fillColor: disaster.severity === 'high' ? '#fee2e2' : 
                    disaster.severity === 'medium' ? '#fef3c7' : '#dcfce7',
          fillOpacity: 0.2,
          weight: 1
        }).addTo(markersLayerRef.current!);

        // Update circle radius on zoom
        mapRef.current?.on('zoomend', () => {
          circle.setRadius(getRadius());
        });

        // Create custom icon for the marker with zoom-based sizing
        const getIconSize = () => {
          const currentZoom = mapRef.current?.getZoom() || 5;
          return Math.max(20, Math.min(40, 30 + (currentZoom - 5) * 2));
        };

        const createIcon = (size: number) => L.divIcon({
          html: `
            <div class="relative">
              <div class="text-2xl" style="font-size: ${size * 0.5}px">${disasterInfo.icon}</div>
              <div class="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-${disaster.severity === 'high' ? 'red' : disaster.severity === 'medium' ? 'yellow' : 'green'}-500"></div>
            </div>
          `,
          className: 'disaster-marker',
          iconSize: [size, size]
        });

        // Create and add marker
        const marker = L.marker(disaster.location, { 
          icon: createIcon(getIconSize())
        })
          .bindPopup(`
            <div class="p-3">
              <div class="text-lg font-bold mb-2">${disasterInfo.label} Alert</div>
              <div class="text-sm mb-3">${disaster.description}</div>
              <div class="text-xs space-y-2">
                <div class="p-2 bg-red-50 rounded">
                  <div class="font-semibold text-red-700">Affected Areas:</div>
                  <div class="text-red-600">${disaster.affectedAreas.join(', ')}</div>
                </div>
                <div class="p-2 bg-yellow-50 rounded">
                  <div class="font-semibold text-yellow-700">Evacuation Zones:</div>
                  <div class="text-yellow-600">${disaster.evacuationZones.join(', ')}</div>
                </div>
                <div class="p-2 bg-green-50 rounded">
                  <div class="font-semibold text-green-700">Safe Zones:</div>
                  <div class="text-green-600">${disaster.safeZones.join(', ')}</div>
                </div>
                <div class="mt-3 text-right text-gray-500 text-[11px]">
                  Last updated: ${new Date(disaster.lastUpdate).toLocaleString()}
                </div>
              </div>
            </div>
          `, {
            maxWidth: 300,
            className: 'disaster-popup'
          });

        if (markersLayerRef.current) {
          marker.addTo(markersLayerRef.current);
        }
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [disasters, disasterTypes, filteredDisasters]);

  const toggleFilter = (type: string) => {
    setActiveFilters(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  return (
    <div className="relative w-full h-full">
      {/* Search and Filter Controls */}
      <div className="absolute top-4 left-4 z-[400] flex flex-col gap-2">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search locations..."
              className="pl-8 pr-4 py-2 w-64 rounded-md border border-gray-200 dark:border-gray-700 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2">
          <div className="text-sm font-medium mb-2 px-2">Filter by Type</div>
          <div className="space-y-1">
            {Object.entries(disasterTypes).map(([type, info]) => (
              <button
                key={type}
                onClick={() => toggleFilter(type)}
                className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-sm ${
                  activeFilters.includes(type)
                    ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-xl">{info.icon}</span>
                <span>{info.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div id="disaster-map" className="w-full h-full">
        {isLoading && (
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg">
              <div className="animate-spin h-6 w-6 border-2 border-red-600 border-t-transparent rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 