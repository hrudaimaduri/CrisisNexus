import { ArrowLeft, Phone, Siren, Ambulance, Building, Shield, Info } from "lucide-react";
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

interface EmergencyContact {
  name: string;
  number: string;
  description: string;
}

interface EmergencyService {
  title: string;
  description: string;
  icon: JSX.Element;
  contacts: EmergencyContact[];
}

export default function EmergencyServicesPage() {
  const services: EmergencyService[] = [
    {
      title: "Police Services",
      description: "Law enforcement and emergency response for criminal activities, accidents, and public safety.",
      icon: <Shield className="h-6 w-6 text-blue-500" />,
      contacts: [
        {
          name: "Emergency Police",
          number: "911",
          description: "For immediate police assistance in emergencies"
        },
        {
          name: "Non-Emergency Police",
          number: "311",
          description: "For non-emergency police matters and inquiries"
        },
        {
          name: "Crime Stoppers",
          number: "1-800-222-TIPS",
          description: "Anonymous crime reporting hotline"
        }
      ]
    },
    {
      title: "Fire Department",
      description: "Fire emergency response, rescue operations, and fire prevention services.",
      icon: <Siren className="h-6 w-6 text-red-500" />,
      contacts: [
        {
          name: "Fire Emergency",
          number: "911",
          description: "For fire emergencies and immediate rescue needs"
        },
        {
          name: "Fire Prevention",
          number: "555-0123",
          description: "Fire safety inspections and prevention information"
        },
        {
          name: "Smoke Alarm Program",
          number: "555-0124",
          description: "Free smoke alarm installation and battery replacement"
        }
      ]
    },
    {
      title: "Medical Emergency",
      description: "Emergency medical services, ambulance, and paramedic response.",
      icon: <Ambulance className="h-6 w-6 text-green-500" />,
      contacts: [
        {
          name: "Medical Emergency",
          number: "911",
          description: "For life-threatening medical emergencies"
        },
        {
          name: "Poison Control",
          number: "1-800-222-1222",
          description: "24/7 poison emergency and information"
        },
        {
          name: "Medical Helpline",
          number: "555-0125",
          description: "24/7 medical advice from healthcare professionals"
        }
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
        <h1 className="text-4xl font-bold">Emergency Services</h1>
      </div>

      {/* Emergency Notice */}
      <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-lg mb-8">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-red-500 mt-1" />
          <div>
            <h3 className="font-semibold text-red-600 dark:text-red-400">Important Notice</h3>
            <p className="text-red-600 dark:text-red-400">
              For any life-threatening emergency, immediately dial 911. Don't delay calling emergency services
              if you believe there's a serious situation.
            </p>
          </div>
        </div>
      </div>

      {/* Services Tabs */}
      <Tabs defaultValue="police" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-2xl mx-auto">
          <TabsTrigger value="police">Police</TabsTrigger>
          <TabsTrigger value="fire">Fire</TabsTrigger>
          <TabsTrigger value="medical">Medical</TabsTrigger>
        </TabsList>

        {services.map((service, index) => (
          <TabsContent 
            key={index} 
            value={service.title.toLowerCase().split(' ')[0]}
            className="space-y-6"
          >
            {/* Service Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  {service.icon}
                  <div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {service.contacts.map((contact, contactIndex) => (
                    <div 
                      key={contactIndex}
                      className="flex items-start justify-between p-4 rounded-lg border"
                    >
                      <div>
                        <h4 className="font-medium">{contact.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {contact.description}
                        </p>
                      </div>
                      <Button variant="outline" className="gap-2" asChild>
                        <Link href={`tel:${contact.number.replace(/\D/g, '')}`}>
                          <Phone className="h-4 w-4" />
                          {contact.number}
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Service-Specific Information */}
            <Card>
              <CardHeader>
                <CardTitle>When to Call</CardTitle>
                <CardDescription>
                  Guidelines for when to contact {service.title.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc pl-6">
                  {service.title === "Police Services" && (
                    <>
                      <li>Crimes in progress or just occurred</li>
                      <li>Suspicious activities or persons</li>
                      <li>Traffic accidents</li>
                      <li>Missing persons</li>
                      <li>Domestic violence</li>
                    </>
                  )}
                  {service.title === "Fire Department" && (
                    <>
                      <li>Fire or smoke</li>
                      <li>Gas leaks or chemical spills</li>
                      <li>Trapped persons or animals</li>
                      <li>Building collapse</li>
                      <li>Carbon monoxide alarms</li>
                    </>
                  )}
                  {service.title === "Medical Emergency" && (
                    <>
                      <li>Difficulty breathing</li>
                      <li>Chest pain or pressure</li>
                      <li>Severe bleeding or burns</li>
                      <li>Loss of consciousness</li>
                      <li>Suspected stroke or heart attack</li>
                    </>
                  )}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Additional Information */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>What to Expect When Calling 911</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2 list-decimal pl-6">
              <li>Stay calm and speak clearly</li>
              <li>Provide your exact location</li>
              <li>Describe the emergency situation</li>
              <li>Answer all dispatcher questions</li>
              <li>Follow dispatcher instructions</li>
              <li>Don't hang up until instructed</li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emergency Preparedness Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 list-disc pl-6">
              <li>Keep emergency numbers easily accessible</li>
              <li>Teach children how to call 911</li>
              <li>Know your exact address and landmarks</li>
              <li>Have a family emergency plan</li>
              <li>Keep a basic first aid kit at home</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 