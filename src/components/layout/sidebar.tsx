"use client";

import Link from "next/link";
import { AlertTriangle, Clock, Compass, MapPin, X, Home, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocations } from "@/context/locations-context";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const { locations, removeLocation } = useLocations();
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-muted/40 p-4">
      <nav className="space-y-2">
        <Link
          href="/"
          className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-all hover:text-foreground ${
            pathname === "/" 
              ? "bg-primary/10 text-primary" 
              : "text-muted-foreground"
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-sm font-medium">Home</span>
        </Link>
        <Link
          href="/dashboard"
          className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-all hover:text-foreground ${
            pathname === "/dashboard" 
              ? "bg-primary/10 text-primary" 
              : "text-muted-foreground"
          }`}
        >
          <Compass className="h-5 w-5" />
          <span className="text-sm font-medium">Dashboard</span>
        </Link>
        <Link
          href="/alerts"
          className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-all hover:text-foreground ${
            pathname === "/alerts" 
              ? "bg-primary/10 text-primary" 
              : "text-muted-foreground"
          }`}
        >
          <AlertTriangle className="h-5 w-5" />
          <span className="text-sm font-medium">Alerts</span>
        </Link>
        <Link
          href="/locations"
          className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-all hover:text-foreground ${
            pathname === "/locations" 
              ? "bg-primary/10 text-primary" 
              : "text-muted-foreground"
          }`}
        >
          <MapPin className="h-5 w-5" />
          <span className="text-sm font-medium">Locations</span>
        </Link>
        <Link
          href="/history"
          className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-all hover:text-foreground ${
            pathname === "/history" 
              ? "bg-primary/10 text-primary" 
              : "text-muted-foreground"
          }`}
        >
          <Clock className="h-5 w-5" />
          <span className="text-sm font-medium">Alert History</span>
        </Link>
        <Link
          href="/resources"
          className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-all hover:text-foreground ${
            pathname === "/resources" 
              ? "bg-primary/10 text-primary" 
              : "text-muted-foreground"
          }`}
        >
          <BookOpen className="h-5 w-5" />
          <span className="text-sm font-medium">Resources</span>
        </Link>
      </nav>
      <div className="mt-8">
        <h3 className="mb-2 text-sm font-medium">Monitored Locations</h3>
        <ul className="space-y-1">
          {locations.length > 0 ? (
            locations.map((location, index) => (
              <li 
                key={location.name} 
                className={`flex items-center justify-between rounded-md px-3 py-2 text-sm ${
                  index === 0 ? "bg-background" : ""
                }`}
              >
                <span>{location.name}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5"
                  onClick={() => removeLocation(location.name)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-sm text-muted-foreground">
              No locations monitored
            </li>
          )}
        </ul>
        <Link href="/locations">
          <Button variant="outline" size="sm" className="mt-2 w-full">
            Add Location
          </Button>
        </Link>
      </div>
    </aside>
  );
}