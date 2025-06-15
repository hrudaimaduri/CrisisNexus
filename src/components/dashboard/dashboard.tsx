"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MapView from "./map-view";
import AlertFeed from "./alert-feed";
import AlertHistory from "./alert-history";

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Disaster Map</CardTitle>
            </CardHeader>
            <CardContent>
              <MapView />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <AlertFeed />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <AlertHistory />
      </div>
    </div>
  );
} 