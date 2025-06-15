"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { backendService } from "@/services/backend-service";
import { formatDistanceToNow } from "date-fns";

interface SystemStatus {
  isProcessing: boolean;
  lastUpdate: string;
  activeAlerts: number;
  latestUpdates: number;
  dataSources: {
    total: number;
    active: number;
    inactive: number;
  };
}

export default function SystemMonitor() {
  const [status, setStatus] = useState<SystemStatus>({
    isProcessing: false,
    lastUpdate: new Date().toISOString(),
    activeAlerts: 0,
    latestUpdates: 0,
    dataSources: {
      total: 0,
      active: 0,
      inactive: 0
    }
  });

  useEffect(() => {
    const updateStatus = () => {
      const sources = backendService.getDataSources();
      const activeAlerts = backendService.getActiveAlerts();
      const latestUpdates = backendService.getLatestUpdates();

      setStatus({
        isProcessing: false, // This would come from the backend service
        lastUpdate: new Date().toISOString(),
        activeAlerts: activeAlerts.length,
        latestUpdates: latestUpdates.length,
        dataSources: {
          total: sources.length,
          active: sources.filter(s => s.status === 'active').length,
          inactive: sources.filter(s => s.status === 'inactive').length
        }
      });
    };

    updateStatus();
    const interval = setInterval(updateStatus, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Monitor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Active Alerts</h3>
            <p className="text-2xl font-bold">{status.activeAlerts}</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Latest Updates</h3>
            <p className="text-2xl font-bold">{status.latestUpdates}</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Data Sources</h3>
            <div className="space-y-1">
              <p className="text-sm">
                Total: <span className="font-medium">{status.dataSources.total}</span>
              </p>
              <p className="text-sm">
                Active: <span className="font-medium text-green-600">{status.dataSources.active}</span>
              </p>
              <p className="text-sm">
                Inactive: <span className="font-medium text-red-600">{status.dataSources.inactive}</span>
              </p>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Last Update</h3>
            <p className="text-sm">
              {formatDistanceToNow(new Date(status.lastUpdate))} ago
            </p>
          </div>
        </div>

        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-sm font-medium text-gray-500 mb-2">System Status</h3>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              status.isProcessing ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'
            }`} />
            <span className="text-sm">
              {status.isProcessing ? 'Processing data...' : 'System idle'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 