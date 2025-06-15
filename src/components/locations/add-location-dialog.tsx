"use client";

import { useState } from "react";
import { MapPin, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useLocations } from "@/context/locations-context";
import { toast } from "sonner";

// Mock locations for search suggestions
const LOCATION_SUGGESTIONS = [
  "Mumbai, Maharashtra",
  "Delhi, Delhi",
  "Bangalore, Karnataka",
  "Hyderabad, Telangana",
  "Chennai, Tamil Nadu",
  "Kolkata, West Bengal",
  "Pune, Maharashtra",
  "Ahmedabad, Gujarat",
  "Jaipur, Rajasthan",
  "Lucknow, Uttar Pradesh",
];

export default function AddLocationDialog() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const { addLocation } = useLocations();

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    if (term.trim() === "") {
      setFilteredLocations([]);
      return;
    }
    
    const filtered = LOCATION_SUGGESTIONS.filter(location => 
      location.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredLocations(filtered);
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setSearchTerm(location);
    setFilteredLocations([]);
  };

  const handleAddLocation = () => {
    if (selectedLocation) {
      console.log("Adding location:", selectedLocation);
      
      // Add the location using our context
      const success = addLocation(selectedLocation);
      
      // Close the dialog
      setOpen(false);
      setSearchTerm("");
      setSelectedLocation("");
      
      // Show success notification - we're using an alert as a simple solution
      // In a real app you'd use a toast notification
      if (success) {
        alert(`Location ${selectedLocation} added successfully!`);
      } else {
        alert(`Location ${selectedLocation} already exists!`);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Location
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Location</DialogTitle>
          <DialogDescription>
            Search for a location to add to your monitored areas.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="Search for a location..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            {filteredLocations.length > 0 && (
              <div className="absolute z-50 mt-12 max-h-72 w-full overflow-auto rounded-md border bg-popover shadow-md">
                <div className="p-1">
                  {filteredLocations.map((location) => (
                    <div
                      key={location}
                      className="flex cursor-pointer items-center rounded-sm px-2 py-1.5 hover:bg-accent hover:text-accent-foreground"
                      onClick={() => handleLocationSelect(location)}
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      <span>{location}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleAddLocation} disabled={!selectedLocation}>
            Add Location
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 