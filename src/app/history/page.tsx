import MainLayout from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Clock, Filter, Search } from "lucide-react";

export default function HistoryPage() {
  const alertHistory = [
    {
      id: 1,
      title: "Earthquake Alert",
      location: "Gujarat",
      severity: "High",
      date: "2024-01-15",
      time: "14:30",
      status: "Resolved",
      duration: "6 hours",
    },
    {
      id: 2,
      title: "Flash Flood Warning",
      location: "Kerala",
      severity: "High",
      date: "2024-01-12",
      time: "09:15",
      status: "Resolved",
      duration: "12 hours",
    },
    {
      id: 3,
      title: "Cyclone Alert",
      location: "Odisha",
      severity: "Medium",
      date: "2024-01-10",
      time: "18:45",
      status: "Resolved",
      duration: "18 hours",
    },
    {
      id: 4,
      title: "Heat Wave Advisory",
      location: "Rajasthan",
      severity: "Medium",
      date: "2024-01-08",
      time: "11:20",
      status: "Resolved",
      duration: "24 hours",
    },
    {
      id: 5,
      title: "Heavy Rain Alert",
      location: "Mumbai",
      severity: "Low",
      date: "2024-01-05",
      time: "16:30",
      status: "Resolved",
      duration: "8 hours",
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "text-red-600 bg-red-50";
      case "Medium":
        return "text-amber-600 bg-amber-50";
      case "Low":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Alert History</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search alert history..."
              className="pl-8"
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Alerts</TabsTrigger>
            <TabsTrigger value="high">High Severity</TabsTrigger>
            <TabsTrigger value="medium">Medium Severity</TabsTrigger>
            <TabsTrigger value="low">Low Severity</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {alertHistory.map((alert) => (
              <Card key={alert.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <CardTitle className="text-lg">{alert.title}</CardTitle>
                        <CardDescription>{alert.location} • {alert.date} at {alert.time}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600">
                        {alert.status}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Duration: {alert.duration}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="high" className="space-y-4">
            {alertHistory
              .filter((alert) => alert.severity === "High")
              .map((alert) => (
                <Card key={alert.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <div>
                          <CardTitle className="text-lg">{alert.title}</CardTitle>
                          <CardDescription>{alert.location} • {alert.date} at {alert.time}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                          {alert.severity}
                        </span>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600">
                          {alert.status}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Duration: {alert.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="medium" className="space-y-4">
            {alertHistory
              .filter((alert) => alert.severity === "Medium")
              .map((alert) => (
                <Card key={alert.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-amber-600" />
                        <div>
                          <CardTitle className="text-lg">{alert.title}</CardTitle>
                          <CardDescription>{alert.location} • {alert.date} at {alert.time}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                          {alert.severity}
                        </span>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600">
                          {alert.status}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Duration: {alert.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="low" className="space-y-4">
            {alertHistory
              .filter((alert) => alert.severity === "Low")
              .map((alert) => (
                <Card key={alert.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-blue-600" />
                        <div>
                          <CardTitle className="text-lg">{alert.title}</CardTitle>
                          <CardDescription>{alert.location} • {alert.date} at {alert.time}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                          {alert.severity}
                        </span>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600">
                          {alert.status}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Duration: {alert.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}