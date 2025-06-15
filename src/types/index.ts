export interface Alert {
  title: string;
  location: string;
  time: string;
  priority: "high" | "medium" | "low";
  content: string;
  safetyInstructions?: string[];
}

export interface NewsItem {
  title: string;
  time: string;
  content: string;
}

export interface StatsItem {
  title: string;
  value: string;
  description: string;
  variant: "default" | "danger" | "warning";
}