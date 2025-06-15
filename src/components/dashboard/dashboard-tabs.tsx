import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AlertCard from "./alert-card";
import MapView from "./map-view";
import NewsItem from "./news-item";
import DisasterControl from "./disaster-control";

type AlertPriority = "high" | "medium" | "low";

interface Alert {
  title: string;
  location: string;
  time: string;
  priority: AlertPriority;
  content: string;
  safetyInstructions?: string[];
}

export default function DashboardTabs() {
  const alerts: Alert[] = [
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

  const newsItems = [
    {
      title: "NDMA Deploys Response Teams to Flood-Affected Areas",
      time: "2 hours ago",
      content: "The National Disaster Management Authority has deployed specialized response teams to the flood-affected areas in New Delhi. Rescue operations are underway to evacuate stranded residents.",
    },
    {
      title: "Weather Department Issues Cyclone Alert",
      time: "5 hours ago",
      content: "The Indian Meteorological Department has issued a cyclone alert for the eastern coastal regions. Fishermen have been advised not to venture into the sea for the next 72 hours.",
    },
  ];

  return (
    <Tabs defaultValue="map" className="mb-6">
      <TabsList>
        <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
        <TabsTrigger value="map">Map View</TabsTrigger>
        <TabsTrigger value="controls">Disaster Controls</TabsTrigger>
        <TabsTrigger value="news">Latest Updates</TabsTrigger>
      </TabsList>

      <TabsContent value="alerts" className="space-y-4 mt-4">
        {alerts.map((alert, index) => (
          <AlertCard key={index} alert={alert} />
        ))}
      </TabsContent>

      <TabsContent value="map">
        <MapView />
      </TabsContent>
      
      <TabsContent value="controls" className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DisasterControl />
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Disaster Management Instructions</h3>
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-2">Using the Control Panel</h4>
              <ul className="text-sm space-y-2 text-blue-700 dark:text-blue-300">
                <li>• Select a location to update its disaster status</li>
                <li>• Choose the type of disaster affecting the area</li>
                <li>• Add a description with specific details</li>
                <li>• The map will automatically update to reflect changes</li>
                <li>• High-risk disaster types will trigger emergency alerts</li>
              </ul>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="news">
        <div className="space-y-4">
          {newsItems.map((news, index) => (
            <NewsItem key={index} news={news} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}