"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { disasterService, DisasterAlert } from "@/services/disaster-service";
import { format } from "date-fns";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";

export default function AlertHistory() {
  const [alerts, setAlerts] = useState<DisasterAlert[]>([]);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(new Date().getFullYear(), 0, 1), // Start of current year
    to: new Date(), // Current date
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const fetchHistory = async () => {
      if (dateRange.from && dateRange.to) {
        const history = await disasterService.fetchAlertHistory(
          dateRange.from.toISOString(),
          dateRange.to.toISOString()
        );
        setAlerts(history);
      }
    };

    fetchHistory();
  }, [dateRange]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-amber-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Alert History</CardTitle>
        <div className="mt-4">
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
          />
        </div>
      </CardHeader>
      <CardContent>
        {isMounted && (
          <div className="space-y-4">
            {alerts.length === 0 ? (
              <p className="text-center text-gray-500">No alerts found for the selected period</p>
            ) : (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{alert.type}</h3>
                      <p className="text-sm text-gray-600">{alert.description}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-medium ${getSeverityColor(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        {format(new Date(alert.timestamp), 'MMM d, yyyy HH:mm')}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                    <span>Source: {alert.source}</span>
                    <span className={`px-2 py-1 rounded ${
                      alert.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {alert.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 