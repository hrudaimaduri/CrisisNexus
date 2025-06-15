"use client";

import { useState, useEffect } from 'react';
import { Alert } from '@/types';

// Mock data for demonstration
const mockAlerts: Alert[] = [
  {
    title: "Flood Warning",
    location: "New Delhi Region",
    time: "35 minutes ago",
    priority: "high",
    content: "Heavy rainfall has caused significant flooding in the New Delhi region. Several areas are experiencing rising water levels. Please avoid low-lying areas and follow evacuation orders if issued.",
    safetyInstructions: [
      "Move to higher ground immediately if in a flood-prone area",
      "Do not walk, swim, or drive through flood waters",
      "Stay off bridges over fast-moving water",
    ],
  },
  {
    title: "Heavy Rain Advisory",
    location: "Mumbai Region",
    time: "2 hours ago",
    priority: "medium",
    content: "Heavy rainfall expected in Mumbai over the next 24 hours. Potential for localized flooding in low-lying areas. Please stay informed and prepare accordingly.",
  },
  {
    title: "Cyclone Watch",
    location: "East Coast",
    time: "5 hours ago",
    priority: "medium",
    content: "A tropical cyclone is forming in the Bay of Bengal and may impact coastal areas in the next 72 hours. Preparations should begin now. Further updates will be provided as the situation develops.",
  },
];

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setAlerts(mockAlerts);
      } catch (err) {
        setError('Failed to fetch alerts');
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  const getAlertsByPriority = (priority: string) => {
    return alerts.filter(alert => alert.priority === priority);
  };

  const getActiveAlertsCount = () => {
    return alerts.length;
  };

  return {
    alerts,
    loading,
    error,
    getAlertsByPriority,
    getActiveAlertsCount,
  };
}