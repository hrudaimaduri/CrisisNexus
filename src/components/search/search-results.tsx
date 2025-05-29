"use client";

import { useSearch } from "@/context/search-context";
import { AlertTriangle, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SearchResults() {
  const { searchQuery, searchResults, isSearching, clearSearch, goToResult } = useSearch();

  if (!searchQuery.trim()) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background rounded-md border shadow-lg max-h-[70vh] overflow-auto">
      <div className="flex items-center justify-between p-2 border-b">
        <span className="text-sm font-medium">
          {isSearching ? "Searching..." : `Found ${searchResults.length} results`}
        </span>
        <Button variant="ghost" size="sm" onClick={clearSearch} className="h-6 w-6 p-0">
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((result, index) => (
            <li 
              key={`${result.type}-${index}`}
              className="flex items-center gap-2 p-2 hover:bg-muted cursor-pointer border-b last:border-0"
              onClick={() => goToResult(result)}
            >
              {result.type === 'location' ? (
                <MapPin className="h-4 w-4 text-blue-500 flex-shrink-0" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{result.title}</div>
                {result.subtitle && (
                  <div className="text-xs text-muted-foreground truncate">{result.subtitle}</div>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="p-4 text-center text-muted-foreground">
          {isSearching ? (
            <div className="animate-pulse">Searching...</div>
          ) : (
            <div>No results found for "{searchQuery}"</div>
          )}
        </div>
      )}
    </div>
  );
} 