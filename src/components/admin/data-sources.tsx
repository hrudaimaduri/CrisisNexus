"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { backendService } from "@/services/backend-service";
import { formatDistanceToNow } from "date-fns";

interface DataSource {
  id: string;
  name: string;
  type: 'news' | 'youtube' | 'weather' | 'government';
  url: string;
  apiKey?: string;
  lastFetched: string;
  status: 'active' | 'inactive';
}

export default function DataSources() {
  const [sources, setSources] = useState<DataSource[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newSource, setNewSource] = useState<Partial<DataSource>>({
    type: 'news',
    status: 'active'
  });

  useEffect(() => {
    loadSources();
  }, []);

  const loadSources = () => {
    const dataSources = backendService.getDataSources();
    setSources(dataSources);
  };

  const handleAddSource = async () => {
    if (!newSource.name || !newSource.url) return;

    await backendService.addDataSource(newSource as Omit<DataSource, 'id' | 'lastFetched'>);
    setIsAdding(false);
    setNewSource({ type: 'news', status: 'active' });
    loadSources();
  };

  const handleUpdateStatus = async (id: string, status: 'active' | 'inactive') => {
    await backendService.updateDataSource(id, { status });
    loadSources();
  };

  const handleRemoveSource = async (id: string) => {
    await backendService.removeDataSource(id);
    loadSources();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Data Sources</span>
          <Button onClick={() => setIsAdding(true)}>Add Source</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isAdding && (
          <div className="mb-6 p-4 border rounded-lg space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newSource.name || ''}
                  onChange={(e) => setNewSource({ ...newSource, name: e.target.value })}
                  placeholder="Source name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={newSource.type}
                  onValueChange={(value: 'news' | 'youtube' | 'weather' | 'government') =>
                    setNewSource({ ...newSource, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="news">News</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="weather">Weather</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={newSource.url || ''}
                onChange={(e) => setNewSource({ ...newSource, url: e.target.value })}
                placeholder="API URL or channel ID"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key (optional)</Label>
              <Input
                id="apiKey"
                type="password"
                value={newSource.apiKey || ''}
                onChange={(e) => setNewSource({ ...newSource, apiKey: e.target.value })}
                placeholder="API key if required"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSource}>Add Source</Button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {sources.map((source) => (
            <div
              key={source.id}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{source.name}</h3>
                  <p className="text-sm text-gray-600">{source.url}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Last fetched: {formatDistanceToNow(new Date(source.lastFetched))} ago
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Select
                    value={source.status}
                    onValueChange={(value: 'active' | 'inactive') =>
                      handleUpdateStatus(source.id, value)
                    }
                  >
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveSource(source.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 