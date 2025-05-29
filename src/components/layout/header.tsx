"use client";

import { useRef } from "react";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NotificationsDropdown from "./notifications-dropdown";
import SettingsPanel from "./settings-panel";
import SearchResults from "@/components/search/search-results";
import { useSearch } from "@/context/search-context";

export default function Header() {
  const { searchQuery, handleSearch, handleKeyDown, clearSearch } = useSearch();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold">
              CN
            </div>
            <span className="text-xl font-medium">CrisisNexus</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-4">
          <div className="relative w-full" ref={searchContainerRef}>
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search alerts, locations..."
              className="w-full bg-background pl-8 rounded-lg border-muted pr-8"
              value={searchQuery}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
            />
            {searchQuery && (
              <button 
                className="absolute right-2 top-2 text-muted-foreground hover:text-foreground" 
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <SearchResults />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <NotificationsDropdown />
          <SettingsPanel />
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}