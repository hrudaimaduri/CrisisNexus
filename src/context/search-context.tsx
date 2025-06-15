"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useLocations, MonitoredLocation } from "./locations-context";

interface SearchResult {
  type: "location" | "alert";
  title: string;
  url: string;
  subtitle?: string;
}

interface SearchContextType {
  searchQuery: string;
  searchResults: SearchResult[];
  isSearching: boolean;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  clearSearch: () => void;
  goToResult: (result: SearchResult) => void;
}

// Mock alert data - in a real app, this would come from an API or context
const alertsData = [
  {
    id: "a1",
    title: "Flood Warning",
    location: "New Delhi Region",
    priority: "high",
  },
  {
    id: "a2",
    title: "Heavy Rain Advisory",
    location: "Mumbai Region",
    priority: "medium",
  },
  {
    id: "a3",
    title: "Cyclone Watch",
    location: "East Coast",
    priority: "medium",
  },
];

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { locations } = useLocations();
  const router = useRouter();

  const performSearch = useCallback((query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const lowercaseQuery = query.toLowerCase();
    
    // Search through locations
    const locationResults = locations
      .filter(location => 
        location.name.toLowerCase().includes(lowercaseQuery)
      )
      .map(location => ({
        type: "location" as const,
        title: location.name,
        subtitle: `${location.activeAlerts} active alerts`,
        url: `/locations`,
      }));
    
    // Search through alerts
    const alertResults = alertsData
      .filter(alert => 
        alert.title.toLowerCase().includes(lowercaseQuery) || 
        alert.location.toLowerCase().includes(lowercaseQuery)
      )
      .map(alert => ({
        type: "alert" as const,
        title: alert.title,
        subtitle: alert.location,
        url: `/alerts#${alert.id}`,
      }));
    
    // Combine results and limit to top 10
    const combinedResults = [...locationResults, ...alertResults].slice(0, 10);
    setSearchResults(combinedResults);
    setIsSearching(false);
  }, [locations]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    performSearch(newQuery);
  }, [performSearch]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchResults.length > 0) {
      // Navigate to the first result
      router.push(searchResults[0].url);
      setSearchQuery("");
      setSearchResults([]);
    }
  }, [searchResults, router]);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setSearchResults([]);
  }, []);

  const goToResult = useCallback((result: SearchResult) => {
    router.push(result.url);
    clearSearch();
  }, [router, clearSearch]);

  return (
    <SearchContext.Provider 
      value={{ 
        searchQuery, 
        searchResults, 
        isSearching, 
        setSearchQuery, 
        handleSearch, 
        handleKeyDown,
        clearSearch,
        goToResult
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
} 