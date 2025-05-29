import MainLayout from "@/components/layout/main-layout";
import AlertCard from "@/components/dashboard/alert-card";

export default function AlertsPage() {
  const allAlerts = [
    {
      title: "Flood Warning",
      location: "New Delhi Region",
      time: "35 minutes ago",
      priority: "high" as const,
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
      priority: "medium" as const,
      content: "Heavy rainfall expected in Mumbai over the next 24 hours. Potential for localized flooding in low-lying areas. Please stay informed and prepare accordingly.",
    },
    {
      title: "Cyclone Watch",
      location: "East Coast",
      time: "5 hours ago",
      priority: "medium" as const,
      content: "A tropical cyclone is forming in the Bay of Bengal and may impact coastal areas in the next 72 hours. Preparations should begin now. Further updates will be provided as the situation develops.",
    },
    {
      title: "Heat Wave Advisory",
      location: "Rajasthan",
      time: "1 day ago",
      priority: "low" as const,
      content: "Temperatures are expected to reach 45°C in several districts of Rajasthan. Please take necessary precautions to avoid heat-related illnesses.",
    },
  ];

  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">All Alerts</h1>
          <div className="text-sm text-muted-foreground">
            {allAlerts.length} active alerts
          </div>
        </div>
        
        <div className="space-y-4">
          {allAlerts.map((alert, index) => (
            <AlertCard key={index} alert={alert} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}