"use client";

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { DisasterLocation, DisasterTypeInfo } from '@/types/disaster';
import { AlertCircle } from 'lucide-react';

// Define disaster types and their icons
const disasterTypes: Record<string, DisasterTypeInfo> = {
  flood: { icon: '🌊', color: '#2563eb', label: 'Flood' },
  earthquake: { icon: '🏚️', color: '#dc2626', label: 'Earthquake' },
  cyclone: { icon: '🌀', color: '#9333ea', label: 'Cyclone' },
  fire: { icon: '🔥', color: '#ea580c', label: 'Fire' },
  landslide: { icon: '⛰️', color: '#854d0e', label: 'Landslide' }
};

// Create a dynamic import for the actual map component
const MapComponent = dynamic(() => import('./map-component'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg">
        <div className="animate-spin h-6 w-6 border-2 border-red-600 border-t-transparent rounded-full"></div>
      </div>
    </div>
  ),
});

export function DisasterMap() {
  const [disasters, setDisasters] = useState<DisasterLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    highPriority: 0,
    lastUpdate: null as string | null
  });

  useEffect(() => {
    // Fetch disaster data
    const fetchDisasters = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/api/disasters');
        if (!response.ok) {
          throw new Error('Failed to fetch disaster locations');
        }
        const data = await response.json();
        setDisasters(data);
        
        // Update stats
        setStats({
          total: data.length,
          highPriority: data.filter((d: DisasterLocation) => d.severity === 'high').length,
          lastUpdate: data.length > 0 
            ? new Date(Math.max(...data.map((d: DisasterLocation) => new Date(d.updatedAt).getTime()))).toLocaleString()
            : null
        });
      } catch (error) {
        console.error('Failed to fetch disaster locations:', error);
        // Render an empty state instead of throwing repeated errors
        setDisasters([]);
        setStats({ total: 0, highPriority: 0, lastUpdate: null });
        setError('Failed to load disaster locations. Showing map without alerts.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDisasters();

    // Set up auto-refresh every 5 minutes
    const refreshInterval = setInterval(fetchDisasters, 5 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <div className="relative w-full h-[500px] max-w-[1200px] mx-auto rounded-lg overflow-hidden border dark:border-gray-700">
      {error && (
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-md">
            <div className="flex items-center gap-2 text-red-600 mb-2">
              <AlertCircle className="h-5 w-5" />
              <span className="font-medium">Error</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">{error}</p>
          </div>
        </div>
      )}

      <MapComponent 
        disasters={disasters} 
        disasterTypes={disasterTypes} 
        isLoading={isLoading} 
      />

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
        <div className="text-sm font-medium mb-2 dark:text-gray-200">Disaster Types</div>
        <div className="space-y-2">
          {Object.entries(disasterTypes).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <span className="text-xl">{value.icon}</span>
              <span className="text-sm dark:text-gray-300">{value.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
        <div className="text-sm font-medium mb-2 dark:text-gray-200">Current Status</div>
        <div className="text-xs space-y-1">
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-600 dark:text-gray-400">Total Alerts:</span>
            <span className="font-medium dark:text-gray-200">{stats.total}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-600 dark:text-gray-400">High Priority:</span>
            <span className="font-medium text-red-600 dark:text-red-400">{stats.highPriority}</span>
          </div>
          <div className="pt-1 border-t dark:border-gray-700">
            <span className="text-gray-500 dark:text-gray-400">Last Update:</span>
            <div className="font-mono text-[10px] text-gray-600 dark:text-gray-400">
              {stats.lastUpdate || 'No data'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 