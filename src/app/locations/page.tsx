"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Search, X } from "lucide-react";
import AddLocationDialog from "@/components/locations/add-location-dialog";
import { useLocations } from "@/context/locations-context";

export default function LocationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { locations: monitoredLocations, removeLocation } = useLocations();

  // Filter locations based on search query
  const filteredLocations = searchQuery.trim() === "" 
    ? monitoredLocations 
    : monitoredLocations.filter(location => 
        location.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleRemoveLocation = (locationName: string) => {
    if (confirm(`Are you sure you want to remove ${locationName} from monitored locations?`)) {
      removeLocation(locationName);
    }
  };

  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Monitored Locations</h1>
          <AddLocationDialog />
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search locations..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredLocations.length > 0 ? (
            filteredLocations.map((location, index) => (
              <Card key={location.name + index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {location.name}
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={() => handleRemoveLocation(location.name)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${location.statusColor}`}>
                        {location.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Active Alerts</span>
                      <span className="font-medium">{location.activeAlerts}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Last Update</span>
                      <span className="text-sm">{location.lastUpdate}</span>
                    </div>
                    <Button variant="outline" className="w-full mt-3">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center h-32 border rounded-lg bg-muted/10">
              <p className="text-muted-foreground">No locations found</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}