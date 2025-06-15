import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AlertProps {
  alert: {
    title: string;
    location: string;
    time: string;
    priority: "high" | "medium" | "low";
    content: string;
    safetyInstructions?: string[];
  };
}

export default function AlertCard({ alert }: AlertProps) {
  const getPriorityStyles = () => {
    switch (alert.priority) {
      case "high":
        return {
          header: "bg-red-50 rounded-t-lg",
          title: "text-red-700",
          button: "destructive",
          buttonText: "High Priority",
          icon: "text-red-600",
        };
      case "medium":
        return {
          header: "",
          title: "",
          button: "outline",
          buttonClass: "border-amber-200 bg-amber-50 text-amber-700",
          buttonText: "Medium Priority",
          icon: "text-amber-500",
        };
      default:
        return {
          header: "",
          title: "",
          button: "outline",
          buttonClass: "",
          buttonText: "Low Priority",
          icon: "text-blue-500",
        };
    }
  };

  const styles = getPriorityStyles();
  const isHighPriority = alert.priority === "high";

  return (
    <Card className={isHighPriority ? "border-red-200" : ""}>
      <CardHeader className={styles.header}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className={`h-5 w-5 ${styles.icon}`} />
            <CardTitle className={`text-lg font-bold ${styles.title}`}>{alert.title}</CardTitle>
          </div>
          {isHighPriority ? (
            <Button variant="destructive" size="sm">
              {styles.buttonText}
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className={styles.buttonClass}
            >
              {styles.buttonText}
            </Button>
          )}
        </div>
        <CardDescription>{alert.location} • {alert.time}</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <p className={alert.safetyInstructions ? "mb-4" : ""}>
          {alert.content}
        </p>
        {alert.safetyInstructions && (
          <div className="rounded-md bg-muted p-3">
            <h4 className="font-medium mb-2">Safety Instructions:</h4>
            <ul className="space-y-1 text-sm">
              {alert.safetyInstructions.map((instruction, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="rounded-full bg-red-100 p-1 text-red-600 mt-0.5">
                    {index + 1}
                  </span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t flex justify-between">
        <Button variant="outline" size="sm">
          View Details
        </Button>
        <Button variant="outline" size="sm">
          Mark as Read
        </Button>
      </CardFooter>
    </Card>
  );
}