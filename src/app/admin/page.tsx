"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataSources from "@/components/admin/data-sources";
import SystemMonitor from "@/components/admin/system-monitor";
import { backendService } from "@/services/backend-service";
import { useEffect } from "react";

export default function AdminPage() {
  useEffect(() => {
    // Start data processing when the admin page loads
    backendService.startDataProcessing();
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Manage data sources and monitor the disaster alert system.
          </p>
        </CardContent>
      </Card>

      <SystemMonitor />
      <DataSources />
    </div>
  );
} 