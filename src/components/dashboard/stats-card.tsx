import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  variant: "default" | "danger" | "warning";
}

export default function StatsCard({ title, value, description, variant }: StatsCardProps) {
  const getCardStyles = () => {
    switch (variant) {
      case "danger":
        return {
          card: "bg-red-50 border-red-200",
          title: "text-red-700",
          value: "text-red-700",
          description: "text-red-600",
        };
      case "warning":
        return {
          card: "",
          title: "",
          value: "text-amber-600",
          description: "",
        };
      default:
        return {
          card: "",
          title: "",
          value: "",
          description: "text-muted-foreground",
        };
    }
  };

  const styles = getCardStyles();

  return (
    <Card className={styles.card}>
      <CardHeader className="pb-2">
        <CardTitle className={`text-sm font-medium ${styles.title}`}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${styles.value}`}>{value}</div>
        <p className={`text-xs ${styles.description}`}>{description}</p>
      </CardContent>
    </Card>
  );
}