"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { disasterService, DisasterAlert, NewsUpdate } from "@/services/disaster-service";
import { formatDistanceToNow } from "date-fns";

export default function AlertFeed() {
  const [activeAlerts, setActiveAlerts] = useState<DisasterAlert[]>([]);
  const [latestUpdates, setLatestUpdates] = useState<NewsUpdate[]>([]);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const fetchData = async () => {
      const [alerts, updates] = await Promise.all([
        disasterService.fetchActiveAlerts(),
        disasterService.fetchLatestUpdates()
      ]);
      setActiveAlerts(alerts);
      setLatestUpdates(updates);
      setLastUpdate(disasterService.getLastUpdate());
    };

    fetchData();
    // Set up polling every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-amber-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Disaster Alerts & Updates</span>
          <span className="text-sm text-gray-500">
            Last updated: {formatDistanceToNow(new Date(lastUpdate))} ago
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="alerts">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
            <TabsTrigger value="updates">Latest Updates</TabsTrigger>
          </TabsList>
          <TabsContent value="alerts" className="space-y-4">
            {isMounted && activeAlerts.length === 0 ? (
              <p className="text-center text-gray-500">No active alerts</p>
            ) : (
              isMounted && activeAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{alert.type}</h3>
                      <p className="text-sm text-gray-600">{alert.description}</p>
                    </div>
                    <span className={`text-sm font-medium ${getSeverityColor(alert.severity)}`}>
                      {alert.severity.toUpperCase()}
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                    <span>Source: {alert.source}</span>
                    <span>{formatDistanceToNow(new Date(alert.timestamp))} ago</span>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
          <TabsContent value="updates" className="space-y-4">
            {isMounted && latestUpdates.length === 0 ? (
              <p className="text-center text-gray-500">No updates available</p>
            ) : (
              isMounted && latestUpdates.map((update) => (
                <div
                  key={update.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold">{update.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{update.content}</p>
                  <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                    <span>Source: {update.source}</span>
                    <span>{formatDistanceToNow(new Date(update.timestamp))} ago</span>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
} 