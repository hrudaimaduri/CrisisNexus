import StatsCard from "./stats-card";

export default function DashboardStats() {
  const statsData = [
    {
      title: "Active Alerts",
      value: "3",
      description: "2 in your area",
      variant: "danger",
    },
    {
      title: "Monitored Locations",
      value: "3",
      description: "New Delhi, Mumbai, Bangalore",
      variant: "default",
    },
    {
      title: "Alert History",
      value: "24",
      description: "Last 30 days",
      variant: "default",
    },
    {
      title: "Safety Status",
      value: "Caution",
      description: "Flood warning in effect",
      variant: "warning",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
      {statsData.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          variant={stat.variant as "default" | "danger" | "warning"}
        />
      ))}
    </div>
  );
}