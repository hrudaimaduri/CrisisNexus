import { ArrowLeft, Cloud, CloudRain, CloudSnow, Wind, Sun, Thermometer, AlertTriangle, Info } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface WeatherAlert {
  type: string;
  description: string;
  icon: JSX.Element;
  severity: "high" | "medium" | "low";
  guidelines: string[];
  preparations: string[];
}

export default function WeatherAlertsPage() {
  const weatherAlerts: WeatherAlert[] = [
    {
      type: "Flood Warning",
      description: "Rising water levels pose risk to low-lying areas",
      icon: <CloudRain className="h-6 w-6 text-blue-500" />,
      severity: "high",
      guidelines: [
        "Move to higher ground immediately",
        "Avoid walking or driving through flood waters",
        "Stay away from power lines and electrical wires",
        "Be prepared to evacuate",
        "Monitor local news and weather updates"
      ],
      preparations: [
        "Prepare emergency kit with essential supplies",
        "Secure important documents in waterproof container",
        "Fill vehicles with fuel",
        "Charge all communication devices",
        "Stock up on sandbags if available"
      ]
    },
    {
      type: "Severe Storm",
      description: "Thunderstorms with potential for dangerous conditions",
      icon: <Cloud className="h-6 w-6 text-gray-500" />,
      severity: "medium",
      guidelines: [
        "Stay indoors and away from windows",
        "Unplug electrical appliances",
        "Have flashlights ready",
        "Monitor weather updates",
        "Avoid using corded phones"
      ],
      preparations: [
        "Secure outdoor furniture",
        "Clear gutters and drains",
        "Trim dead tree branches",
        "Stock up on batteries",
        "Have emergency lighting ready"
      ]
    },
    {
      type: "Heat Wave",
      description: "Extreme temperatures posing health risks",
      icon: <Thermometer className="h-6 w-6 text-red-500" />,
      severity: "high",
      guidelines: [
        "Stay in air-conditioned areas",
        "Drink plenty of water",
        "Avoid strenuous outdoor activities",
        "Check on elderly neighbors",
        "Never leave children or pets in cars"
      ],
      preparations: [
        "Stock up on water and ice",
        "Prepare cooling stations at home",
        "Have light, breathable clothing",
        "Install window shades or curtains",
        "Know locations of public cooling centers"
      ]
    },
    {
      type: "Winter Storm",
      description: "Severe winter conditions with snow and ice",
      icon: <CloudSnow className="h-6 w-6 text-blue-300" />,
      severity: "medium",
      guidelines: [
        "Stay indoors during the storm",
        "Keep pipes from freezing",
        "Maintain ventilation when using heaters",
        "Clear snow from exhaust pipes",
        "Drive only if absolutely necessary"
      ],
      preparations: [
        "Stock up on winter supplies and food",
        "Have emergency heating equipment",
        "Winterize your home",
        "Keep snow removal equipment ready",
        "Prepare winter emergency car kit"
      ]
    }
  ];

  return (
    <div className="container py-8 md:py-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/resources">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-4xl font-bold">Weather Alerts</h1>
      </div>

      {/* Current Alerts Notice */}
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg mb-8">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1" />
          <div>
            <h3 className="font-semibold text-yellow-600 dark:text-yellow-400">Active Weather Alerts</h3>
            <p className="text-yellow-600 dark:text-yellow-400">
              Monitor this section for real-time weather alerts and warnings in your area.
              Always follow official guidance and evacuation orders.
            </p>
          </div>
        </div>
      </div>

      {/* Weather Alerts Tabs */}
      <Tabs defaultValue="current" className="space-y-6">
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
          <TabsTrigger value="current">Current Alerts</TabsTrigger>
          <TabsTrigger value="preparation">Preparation Guides</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          {weatherAlerts.map((alert, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {alert.icon}
                    <div>
                      <CardTitle>{alert.type}</CardTitle>
                      <CardDescription>{alert.description}</CardDescription>
                    </div>
                  </div>
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                    ${alert.severity === 'high' ? 'bg-red-50 text-red-700 ring-red-600/20' :
                      alert.severity === 'medium' ? 'bg-yellow-50 text-yellow-700 ring-yellow-600/20' :
                      'bg-green-50 text-green-700 ring-green-600/20'} ring-1 ring-inset`}>
                    {alert.severity.toUpperCase()} Risk
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Safety Guidelines</h4>
                    <ul className="space-y-2 list-disc pl-6">
                      {alert.guidelines.map((guideline, idx) => (
                        <li key={idx} className="text-muted-foreground">{guideline}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Preparation Steps</h4>
                    <ul className="space-y-2 list-disc pl-6">
                      {alert.preparations.map((prep, idx) => (
                        <li key={idx} className="text-muted-foreground">{prep}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="preparation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Weather Preparedness</CardTitle>
              <CardDescription>Essential steps to stay prepared for any weather emergency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-medium mb-3">Emergency Kit Essentials</h3>
                  <ul className="space-y-2 list-disc pl-6">
                    <li>Battery-powered weather radio</li>
                    <li>Flashlights and extra batteries</li>
                    <li>First aid supplies</li>
                    <li>3-day supply of non-perishable food</li>
                    <li>Water (1 gallon per person per day)</li>
                    <li>Portable phone chargers</li>
                    <li>Important documents in waterproof container</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-3">Communication Plan</h3>
                  <ul className="space-y-2 list-disc pl-6">
                    <li>Establish family emergency contacts</li>
                    <li>Know your evacuation routes</li>
                    <li>Have an out-of-area contact</li>
                    <li>Keep emergency numbers handy</li>
                    <li>Plan meeting locations</li>
                    <li>Subscribe to weather alerts</li>
                    <li>Keep emergency contact cards</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Seasonal Preparation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Sun className="h-5 w-5 text-yellow-500" />
                    Summer
                  </h3>
                  <ul className="space-y-2 list-disc pl-6 text-sm">
                    <li>Check AC systems</li>
                    <li>Install window shades</li>
                    <li>Stock up on water</li>
                    <li>Prepare for power outages</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <CloudSnow className="h-5 w-5 text-blue-300" />
                    Winter
                  </h3>
                  <ul className="space-y-2 list-disc pl-6 text-sm">
                    <li>Winterize your home</li>
                    <li>Check heating systems</li>
                    <li>Prepare winter car kit</li>
                    <li>Stock up on supplies</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Wind className="h-5 w-5 text-green-500" />
                    Spring
                  </h3>
                  <ul className="space-y-2 list-disc pl-6 text-sm">
                    <li>Clear storm drains</li>
                    <li>Check roof condition</li>
                    <li>Prepare for floods</li>
                    <li>Review insurance</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Cloud className="h-5 w-5 text-orange-500" />
                    Fall
                  </h3>
                  <ul className="space-y-2 list-disc pl-6 text-sm">
                    <li>Clean gutters</li>
                    <li>Trim tree branches</li>
                    <li>Check emergency kit</li>
                    <li>Prepare generators</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Additional Resources */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Additional Resources</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
            <Link href="#">
              <Cloud className="h-6 w-6" />
              <span>Local Weather Forecast</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
            <Link href="#">
              <AlertTriangle className="h-6 w-6" />
              <span>Emergency Alert Signup</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
            <Link href="#">
              <Info className="h-6 w-6" />
              <span>Weather Safety Tips</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 