"use client";

import MainLayout from "@/components/layout/main-layout";
import DashboardStats from "@/components/dashboard/dashboard-stats";
import DashboardTabs from "@/components/dashboard/dashboard-tabs";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-6">Disaster Monitoring Dashboard</h1>
        <DashboardStats />
        <DashboardTabs />
      </div>
    </MainLayout>
  );
}