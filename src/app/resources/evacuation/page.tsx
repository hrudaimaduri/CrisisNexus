import { ArrowLeft, Map, Route, Home, Car, AlertTriangle, Compass, Info, CheckSquare } from "lucide-react";
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

interface EvacuationRoute {
  name: string;
  description: string;
  directions: string[];
  landmarks: string[];
  safetyPoints: string[];
}

interface EvacuationZone {
  name: string;
  risk: "high" | "medium" | "low";
  primaryRoute: string;
  alternateRoute: string;
  shelters: string[];
  specialInstructions: string[];
}

export default function EvacuationPlansPage() {
  const evacuationRoutes: EvacuationRoute[] = [
    {
      name: "North Route",
      description: "Primary evacuation route via major highways to northern safe zones",
      directions: [
        "Take Main Street north to Highway 101",
        "Follow Highway 101 North for 15 miles",
        "Exit at Mountain View Safe Zone",
        "Follow emergency signage to designated shelter"
      ],
      landmarks: [
        "City Hall",
        "Central Park",
        "North Bridge",
        "Mountain View Mall"
      ],
      safetyPoints: [
        "Emergency Response Station A",
        "Medical Aid Station B",
        "Water Distribution Point C",
        "Emergency Shelter D"
      ]
    },
    {
      name: "East Route",
      description: "Alternative route through eastern suburbs to safe zones",
      directions: [
        "Take Oak Avenue east to Route 82",
        "Follow Route 82 East for 10 miles",
        "Turn north at Valley Junction",
        "Follow emergency signage to Valley Safe Zone"
      ],
      landmarks: [
        "East Side Plaza",
        "Valley Hospital",
        "Sports Complex",
        "Valley Junction Mall"
      ],
      safetyPoints: [
        "Emergency Response Station E",
        "Medical Aid Station F",
        "Water Distribution Point G",
        "Emergency Shelter H"
      ]
    }
  ];

  const evacuationZones: EvacuationZone[] = [
    {
      name: "Coastal Zone A",
      risk: "high",
      primaryRoute: "North Route",
      alternateRoute: "East Route",
      shelters: [
        "Mountain View Community Center",
        "North High School",
        "Valley Safe Zone"
      ],
      specialInstructions: [
        "Evacuate immediately when notified",
        "Take only essential items",
        "Follow marked evacuation routes",
        "Do not return until authorized"
      ]
    },
    {
      name: "Valley Zone B",
      risk: "medium",
      primaryRoute: "East Route",
      alternateRoute: "North Route",
      shelters: [
        "Valley Community Center",
        "East High School",
        "Sports Complex"
      ],
      specialInstructions: [
        "Monitor official communications",
        "Prepare for possible evacuation",
        "Keep vehicle fueled",
        "Have emergency kit ready"
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
        <h1 className="text-4xl font-bold">Evacuation Plans</h1>
      </div>

      {/* Emergency Notice */}
      <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-lg mb-8">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-red-500 mt-1" />
          <div>
            <h3 className="font-semibold text-red-600 dark:text-red-400">Important Notice</h3>
            <p className="text-red-600 dark:text-red-400">
              In case of an emergency evacuation order, follow official instructions immediately.
              Do not delay your evacuation. Take only essential items and follow designated routes.
            </p>
          </div>
        </div>
      </div>

      {/* Evacuation Information Tabs */}
      <Tabs defaultValue="routes" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-2xl mx-auto">
          <TabsTrigger value="routes">Routes</TabsTrigger>
          <TabsTrigger value="zones">Zones</TabsTrigger>
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
        </TabsList>

        {/* Routes Tab */}
        <TabsContent value="routes" className="space-y-6">
          {evacuationRoutes.map((route, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Route className="h-6 w-6 text-blue-500" />
                  <div>
                    <CardTitle>{route.name}</CardTitle>
                    <CardDescription>{route.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Compass className="h-4 w-4" />
                      Directions
                    </h4>
                    <ol className="space-y-2 list-decimal pl-6">
                      {route.directions.map((direction, idx) => (
                        <li key={idx} className="text-muted-foreground">{direction}</li>
                      ))}
                    </ol>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Map className="h-4 w-4" />
                      Landmarks
                    </h4>
                    <ul className="space-y-2 list-disc pl-6">
                      {route.landmarks.map((landmark, idx) => (
                        <li key={idx} className="text-muted-foreground">{landmark}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      Safety Points
                    </h4>
                    <ul className="space-y-2 list-disc pl-6">
                      {route.safetyPoints.map((point, idx) => (
                        <li key={idx} className="text-muted-foreground">{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Zones Tab */}
        <TabsContent value="zones" className="space-y-6">
          {evacuationZones.map((zone, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Home className="h-6 w-6 text-blue-500" />
                    <div>
                      <CardTitle>{zone.name}</CardTitle>
                      <CardDescription>Primary Route: {zone.primaryRoute}</CardDescription>
                    </div>
                  </div>
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                    ${zone.risk === 'high' ? 'bg-red-50 text-red-700 ring-red-600/20' :
                      zone.risk === 'medium' ? 'bg-yellow-50 text-yellow-700 ring-yellow-600/20' :
                      'bg-green-50 text-green-700 ring-green-600/20'} ring-1 ring-inset`}>
                    {zone.risk.toUpperCase()} Risk
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Emergency Shelters</h4>
                    <ul className="space-y-2 list-disc pl-6">
                      {zone.shelters.map((shelter, idx) => (
                        <li key={idx} className="text-muted-foreground">{shelter}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Special Instructions</h4>
                    <ul className="space-y-2 list-disc pl-6">
                      {zone.specialInstructions.map((instruction, idx) => (
                        <li key={idx} className="text-muted-foreground">{instruction}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Checklist Tab */}
        <TabsContent value="checklist" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Evacuation Checklist</CardTitle>
              <CardDescription>Essential items and steps to prepare for evacuation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <CheckSquare className="h-5 w-5 text-green-500" />
                    Essential Items
                  </h3>
                  <ul className="space-y-2 list-disc pl-6">
                    <li>Important documents (ID, insurance, etc.)</li>
                    <li>Medications and prescriptions</li>
                    <li>First aid kit</li>
                    <li>Three-day supply of food and water</li>
                    <li>Change of clothes</li>
                    <li>Flashlight and batteries</li>
                    <li>Phone charger and battery bank</li>
                    <li>Cash and small bills</li>
                    <li>Basic toiletries</li>
                    <li>Emergency contact list</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Car className="h-5 w-5 text-blue-500" />
                    Vehicle Preparation
                  </h3>
                  <ul className="space-y-2 list-disc pl-6">
                    <li>Keep gas tank at least half full</li>
                    <li>Check tire pressure and spare tire</li>
                    <li>Store emergency car kit</li>
                    <li>Keep maps in vehicle</li>
                    <li>Plan alternate routes</li>
                    <li>Check weather conditions</li>
                    <li>Pack emergency supplies</li>
                    <li>Have car emergency kit</li>
                    <li>Check road conditions</li>
                    <li>Keep emergency contact info in car</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Before You Leave</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Home Security</h4>
                  <ul className="space-y-2 list-disc pl-6">
                    <li>Lock all doors and windows</li>
                    <li>Turn off utilities if instructed</li>
                    <li>Take photos of property</li>
                    <li>Secure outdoor items</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Communication</h4>
                  <ul className="space-y-2 list-disc pl-6">
                    <li>Notify family/friends of plans</li>
                    <li>Share evacuation route</li>
                    <li>Establish meeting point</li>
                    <li>Keep phones charged</li>
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
              <Map className="h-6 w-6" />
              <span>Interactive Evacuation Map</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
            <Link href="#">
              <AlertTriangle className="h-6 w-6" />
              <span>Emergency Updates</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
            <Link href="#">
              <Info className="h-6 w-6" />
              <span>Evacuation Guidelines</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 