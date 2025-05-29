import { ArrowLeft, AlertTriangle, Shield, Cloud, Waves, Mountain, Flame, Wind, Heart } from "lucide-react";
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

interface DisasterGuide {
  type: string;
  icon: JSX.Element;
  description: string;
  beforeSteps: string[];
  duringSteps: string[];
  afterSteps: string[];
}

export default function DisasterPreparednessPage() {
  const guides: DisasterGuide[] = [
    {
      type: "Floods",
      icon: <Waves className="h-6 w-6 text-blue-500" />,
      description: "Prepare for and respond to flooding emergencies",
      beforeSteps: [
        "Create an emergency kit with essential supplies",
        "Know your area's flood risk and evacuation routes",
        "Install check valves in plumbing",
        "Keep important documents in a waterproof container",
        "Elevate electrical components",
        "Clean drains and gutters regularly"
      ],
      duringSteps: [
        "Move to higher ground immediately",
        "Avoid walking or driving through flood waters",
        "Stay tuned to emergency broadcasts",
        "Turn off utilities if instructed",
        "Follow evacuation orders promptly",
        "Keep children away from flood water"
      ],
      afterSteps: [
        "Wait for official word that it's safe to return",
        "Document damage with photos",
        "Clean and disinfect everything that got wet",
        "Check for structural damage",
        "Watch for animals that may have entered",
        "Avoid flood waters as they may be contaminated"
      ]
    },
    {
      type: "Earthquakes",
      icon: <Mountain className="h-6 w-6 text-gray-500" />,
      description: "Safety measures for before, during, and after earthquakes",
      beforeSteps: [
        "Secure heavy furniture to walls",
        "Know safe spots in each room",
        "Practice drop, cover, and hold on",
        "Keep emergency supplies accessible",
        "Learn how to shut off utilities",
        "Identify building's safe areas"
      ],
      duringSteps: [
        "Drop to the ground",
        "Take cover under sturdy furniture",
        "Hold on until shaking stops",
        "Stay away from windows",
        "If in bed, stay there and protect head",
        "If outdoors, stay in open areas"
      ],
      afterSteps: [
        "Check for injuries and provide first aid",
        "Listen to emergency broadcasts",
        "Check for gas leaks and damage",
        "Be prepared for aftershocks",
        "Stay out of damaged buildings",
        "Help neighbors if possible"
      ]
    },
    {
      type: "Wildfires",
      icon: <Flame className="h-6 w-6 text-orange-500" />,
      description: "Wildfire prevention and response guidelines",
      beforeSteps: [
        "Create defensible space around home",
        "Keep emergency supplies ready",
        "Develop evacuation plan",
        "Clear leaves and debris",
        "Install fire-resistant materials",
        "Keep important documents accessible"
      ],
      duringSteps: [
        "Follow evacuation orders immediately",
        "Close all windows and doors",
        "Remove flammable curtains",
        "Turn off gas supply",
        "Fill containers with water",
        "Keep emergency radio on"
      ],
      afterSteps: [
        "Wait for official clearance to return",
        "Watch for hot spots",
        "Document damage with photos",
        "Check roof and attic for sparks",
        "Contact insurance company",
        "Help community members in need"
      ]
    },
    {
      type: "Hurricanes",
      icon: <Wind className="h-6 w-6 text-cyan-500" />,
      description: "Hurricane preparation and safety measures",
      beforeSteps: [
        "Create emergency supply kit",
        "Know evacuation routes",
        "Install storm shutters",
        "Trim trees and shrubs",
        "Secure outdoor objects",
        "Fill vehicles with fuel"
      ],
      duringSteps: [
        "Stay indoors away from windows",
        "Monitor emergency broadcasts",
        "Keep emergency supplies accessible",
        "Fill bathtubs and containers with water",
        "Stay in small interior room",
        "Follow official instructions"
      ],
      afterSteps: [
        "Stay inside until all-clear",
        "Watch for downed power lines",
        "Document damage",
        "Check on neighbors",
        "Avoid flood waters",
        "Begin cleanup when safe"
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
        <h1 className="text-4xl font-bold">Disaster Preparedness</h1>
      </div>

      {/* Emergency Notice */}
      <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-lg mb-8">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-red-500 mt-1" />
          <div>
            <h3 className="font-semibold text-red-600 dark:text-red-400">Important Notice</h3>
            <p className="text-red-600 dark:text-red-400">
              Being prepared before a disaster strikes can save lives. Review and update your emergency plans regularly.
              Always follow instructions from local authorities during emergencies.
            </p>
          </div>
        </div>
      </div>

      {/* Disaster Guides */}
      <div className="grid gap-6 md:grid-cols-2">
        {guides.map((guide) => (
          <Card key={guide.type}>
            <CardHeader>
              <div className="flex items-center gap-3">
                {guide.icon}
                <div>
                  <CardTitle>{guide.type}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="before">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="before">Before</TabsTrigger>
                  <TabsTrigger value="during">During</TabsTrigger>
                  <TabsTrigger value="after">After</TabsTrigger>
                </TabsList>
                <TabsContent value="before">
                  <ul className="space-y-2 list-disc pl-6">
                    {guide.beforeSteps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="during">
                  <ul className="space-y-2 list-disc pl-6">
                    {guide.duringSteps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="after">
                  <ul className="space-y-2 list-disc pl-6">
                    {guide.afterSteps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Resources */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Additional Resources</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
            <Link href="/resources/emergency-kit">
              <Shield className="h-6 w-6" />
              <span>Emergency Kit Guide</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
            <Link href="/resources/evacuation">
              <Cloud className="h-6 w-6" />
              <span>Evacuation Plans</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
            <Link href="/resources/community">
              <Heart className="h-6 w-6" />
              <span>Community Support</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 