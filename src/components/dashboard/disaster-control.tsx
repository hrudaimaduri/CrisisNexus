"use client";

import { useState } from "react";
import { useLocations, MonitoredLocation } from "@/context/locations-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

// Define disaster type
type DisasterType = "None" | "Flood" | "Earthquake" | "Heavy Rain" | "Cyclone" | "Heatwave";

// Disaster types with corresponding emoji icons
const disasterTypes = [
  { value: "None", label: "None ✅" },
  { value: "Flood", label: "Flood 🌊" },
  { value: "Earthquake", label: "Earthquake 🏚️" },
  { value: "Heavy Rain", label: "Heavy Rain 🌧️" },
  { value: "Cyclone", label: "Cyclone 🌀" },
  { value: "Heatwave", label: "Heatwave 🔥" },
];

export default function DisasterControl() {
  const { locations, updateLocationDisaster } = useLocations();
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedDisaster, setSelectedDisaster] = useState<DisasterType>("None");
  const [disasterDescription, setDisasterDescription] = useState<string>("");

  const handleUpdate = () => {
    if (selectedLocation && selectedDisaster) {
      updateLocationDisaster(
        selectedLocation, 
        selectedDisaster, 
        disasterDescription
      );
      
      // Reset form if disaster is None
      if (selectedDisaster === "None") {
        setDisasterDescription("");
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Update Disaster Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Select
              value={selectedLocation}
              onValueChange={setSelectedLocation}
            >
              <SelectTrigger id="location">
                <SelectValue placeholder="Select a location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location: MonitoredLocation) => (
                  <SelectItem key={location.name} value={location.name}>
                    {location.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="disaster-type">Disaster Type</Label>
            <Select
              value={selectedDisaster}
              onValueChange={(value) => setSelectedDisaster(value as DisasterType)}
            >
              <SelectTrigger id="disaster-type">
                <SelectValue placeholder="Select disaster type" />
              </SelectTrigger>
              <SelectContent>
                {disasterTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedDisaster !== "None" && (
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Enter details about the disaster"
                value={disasterDescription}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDisasterDescription(e.target.value)}
              />
            </div>
          )}
          
          <Button 
            onClick={handleUpdate} 
            disabled={!selectedLocation || !selectedDisaster}
            className="w-full"
          >
            Update Status
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 