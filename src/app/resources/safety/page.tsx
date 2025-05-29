import { ArrowLeft, Shield, AlertTriangle, Heart, Flame, Waves, Wind, Zap, Phone } from "lucide-react";
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

interface SafetyGuideline {
  title: string;
  description: string;
  icon: JSX.Element;
  immediateActions: string[];
  preventiveMeasures: string[];
  doNotDo: string[];
}

export default function SafetyGuidelinesPage() {
  const safetyGuidelines: SafetyGuideline[] = [
    {
      title: "Fire Safety",
      description: "Critical steps for fire prevention and response",
             icon: <Flame className="h-6 w-6 text-red-500" />,
      immediateActions: [
        "Evacuate immediately - don't waste time gathering valuables",
        "Crawl low under smoke",
        "Feel doors for heat before opening",
        "Call emergency services once safely outside",
        "Meet at designated assembly point"
      ],
      preventiveMeasures: [
        "Install smoke detectors on every floor",
        "Create and practice evacuation plan",
        "Keep fire extinguishers accessible",
        "Clear space around heating equipment",
        "Check electrical cords regularly"
      ],
      doNotDo: [
        "Don't open hot doors",
        "Don't use elevators during fire",
        "Don't return to burning building",
        "Don't hide from firefighters",
        "Don't waste time gathering possessions"
      ]
    },
    {
      title: "Medical Emergency",
      description: "Immediate response to medical situations",
      icon: <Heart className="h-6 w-6 text-red-500" />,
      immediateActions: [
        "Call emergency services immediately",
        "Check breathing and pulse",
        "Control severe bleeding",
        "Keep person still if injury suspected",
        "Provide necessary first aid"
      ],
      preventiveMeasures: [
        "Learn basic first aid and CPR",
        "Keep first aid kit well-stocked",
        "Post emergency numbers visibly",
        "Know family medical histories",
        "Keep medications organized"
      ],
      doNotDo: [
        "Don't move injured person unnecessarily",
        "Don't give food or drink",
        "Don't remove embedded objects",
        "Don't panic",
        "Don't leave person unattended"
      ]
    },
    {
      title: "Flood Safety",
      description: "Guidelines for flood situations",
      icon: <Waves className="h-6 w-6 text-blue-500" />,
      immediateActions: [
        "Move to higher ground immediately",
        "Listen to emergency broadcasts",
        "Avoid walking through flowing water",
        "Turn off utilities if instructed",
        "Follow evacuation orders promptly"
      ],
      preventiveMeasures: [
        "Know your flood risk",
        "Prepare emergency kit",
        "Plan evacuation route",
        "Install flood barriers",
        "Keep important documents elevated"
      ],
      doNotDo: [
        "Don't drive through flooded areas",
        "Don't touch electrical equipment if wet",
        "Don't ignore evacuation orders",
        "Don't walk through moving water",
        "Don't return home until authorized"
      ]
    },
    {
      title: "Severe Weather",
      description: "Actions for severe weather events",
      icon: <Wind className="h-6 w-6 text-gray-500" />,
      immediateActions: [
        "Move to interior room on lowest floor",
        "Stay away from windows and doors",
        "Monitor weather updates",
        "Have emergency kit ready",
        "Follow official instructions"
      ],
      preventiveMeasures: [
        "Create emergency plan",
        "Trim dead tree branches",
        "Secure outdoor items",
        "Install storm shutters",
        "Maintain emergency supplies"
      ],
      doNotDo: [
        "Don't stay in mobile homes",
        "Don't go outside during storm",
        "Don't use electrical equipment",
        "Don't ignore warning signs",
        "Don't take unnecessary risks"
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
        <h1 className="text-4xl font-bold">Safety Guidelines</h1>
      </div>

      {/* Emergency Notice */}
      <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-lg mb-8">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-red-500 mt-1" />
          <div>
            <h3 className="font-semibold text-red-600 dark:text-red-400">Emergency Response</h3>
            <p className="text-red-600 dark:text-red-400">
              In case of immediate danger, call emergency services first. These guidelines are for reference and preparation.
              Always follow instructions from emergency responders and local authorities.
            </p>
          </div>
        </div>
      </div>

      {/* Safety Guidelines */}
      <div className="grid gap-6">
        {safetyGuidelines.map((guideline, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center gap-3">
                {guideline.icon}
                <div>
                  <CardTitle>{guideline.title}</CardTitle>
                  <CardDescription>{guideline.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium mb-3 text-red-600">Immediate Actions</h4>
                  <ul className="space-y-2 list-decimal pl-6">
                    {guideline.immediateActions.map((action, idx) => (
                      <li key={idx} className="text-muted-foreground">{action}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3 text-green-600">Preventive Measures</h4>
                  <ul className="space-y-2 list-disc pl-6">
                    {guideline.preventiveMeasures.map((measure, idx) => (
                      <li key={idx} className="text-muted-foreground">{measure}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3 text-yellow-600">Do Not</h4>
                  <ul className="space-y-2 list-disc pl-6">
                    {guideline.doNotDo.map((item, idx) => (
                      <li key={idx} className="text-muted-foreground">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Emergency Contacts */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Emergency Contacts</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-red-500" />
                <CardTitle>Emergency Services</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>Emergency: 911</li>
                <li>Police (non-emergency): Local number</li>
                <li>Fire Department: Local number</li>
                <li>Poison Control: 1-800-222-1222</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-yellow-500" />
                <CardTitle>Utilities</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>Power Company: Local number</li>
                <li>Gas Company: Local number</li>
                <li>Water Company: Local number</li>
                <li>Internet Provider: Local number</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-blue-500" />
                <CardTitle>Support Services</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>Red Cross: 1-800-RED-CROSS</li>
                <li>FEMA: 1-800-621-3362</li>
                <li>Mental Health: 988</li>
                <li>Road Conditions: 511</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="mt-8 flex justify-center">
        <Button variant="outline" className="gap-2">
          <Shield className="h-4 w-4" />
          Download Complete Safety Guide
        </Button>
      </div>
    </div>
  );
} 