import Link from "next/link";
import { 
  Heart, 
  ShieldAlert, 
  Route, 
  PackageSearch, 
  Cloud, 
  Building2, 
  Home, 
  Brain,
  Phone,
  BookOpen,
  AlertTriangle,
  FileHeart,
  MapPin,
  Siren,
  BadgeHelp,
  HeartPulse,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ResourceCard {
  title: string;
  description: string;
  icon: JSX.Element;
  link: string;
  color: string;
}

export default function ResourcesPage() {
  const resources: ResourceCard[] = [
    {
      title: "Emergency Services",
      description: "Quick access to emergency numbers, police, fire, and ambulance services in your area.",
      icon: <Siren className="h-6 w-6" />,
      link: "/resources/emergency-services",
      color: "text-red-500"
    },
    {
      title: "First Aid Guide",
      description: "Step-by-step instructions for basic first aid and emergency medical care.",
      icon: <HeartPulse className="h-6 w-6" />,
      link: "/resources/first-aid",
      color: "text-green-500"
    },
    {
      title: "Evacuation Plans",
      description: "Location-specific evacuation routes, safe zones, and emergency procedures.",
      icon: <Route className="h-6 w-6" />,
      link: "/resources/evacuation",
      color: "text-blue-500"
    },
    {
      title: "Emergency Kit Checklist",
      description: "Essential items to keep ready for various types of emergencies.",
      icon: <PackageSearch className="h-6 w-6" />,
      link: "/resources/emergency-kit",
      color: "text-purple-500"
    },
    {
      title: "Weather Alerts",
      description: "Real-time weather updates, warnings, and natural disaster alerts.",
      icon: <Cloud className="h-6 w-6" />,
      link: "/resources/weather",
      color: "text-cyan-500"
    },
    {
      title: "Medical Centers",
      description: "Find nearby hospitals, clinics, and emergency medical facilities.",
      icon: <Building2 className="h-6 w-6" />,
      link: "/resources/medical-centers",
      color: "text-indigo-500"
    },
    {
      title: "Shelter Locations",
      description: "Emergency shelter information and temporary housing facilities.",
      icon: <Home className="h-6 w-6" />,
      link: "/resources/shelters",
      color: "text-orange-500"
    },
    {
      title: "Mental Health Support",
      description: "24/7 crisis counseling, support services, and mental health resources.",
      icon: <Brain className="h-6 w-6" />,
      link: "/resources/mental-health",
      color: "text-pink-500"
    },
    {
      title: "Emergency Contacts",
      description: "Important phone numbers and contact information for emergency situations.",
      icon: <Phone className="h-6 w-6" />,
      link: "/contact",
      color: "text-yellow-500"
    },
    {
      title: "Safety Guidelines",
      description: "General safety tips and guidelines for various emergency scenarios.",
      icon: <ShieldAlert className="h-6 w-6" />,
      link: "/resources/safety",
      color: "text-emerald-500"
    },
    {
      title: "Disaster Preparedness",
      description: "Comprehensive guides for preparing for different types of disasters.",
      icon: <AlertTriangle className="h-6 w-6" />,
      link: "/resources/preparedness",
      color: "text-rose-500"
    },
    {
      title: "Community Support",
      description: "Connect with local community resources and support groups.",
      icon: <Heart className="h-6 w-6" />,
      link: "/resources/community",
      color: "text-violet-500"
    }
  ];

  return (
    <div className="container py-8 md:py-12">
      <div className="flex items-center gap-4 mb-12">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <Home className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex flex-col items-center text-center flex-1">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Emergency Resources</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Access critical information and resources to help you prepare for, respond to, and recover from emergencies.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <Link href={resource.link} key={resource.title}>
            <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02]">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className={`rounded-full p-2 ${resource.color} bg-opacity-10`}>
                    {resource.icon}
                  </div>
                  <CardTitle>{resource.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{resource.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="inline-flex items-center p-4 rounded-lg bg-red-50 dark:bg-red-900/10">
          <BadgeHelp className="h-5 w-5 text-red-500 mr-2" />
          <p className="text-sm text-red-600 dark:text-red-400">
            Need immediate assistance? Call emergency services at <span className="font-bold">100</span>
          </p>
        </div>
      </div>
    </div>
  );
} 