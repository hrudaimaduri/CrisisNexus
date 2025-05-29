import { ArrowLeft, Heart, Users, Building, Phone, HandHeart, Globe, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CommunityResource {
  name: string;
  type: string;
  description: string;
  contact: string;
  icon: JSX.Element;
  services: string[];
}

export default function CommunityPage() {
  const resources: CommunityResource[] = [
    {
      name: "Local Emergency Response Team",
      type: "Emergency Services",
      description: "Volunteer team trained in disaster response and community assistance",
      contact: "emergency-response@local.org",
      icon: <Users className="h-6 w-6 text-blue-500" />,
      services: [
        "Emergency response coordination",
        "Community disaster training",
        "Search and rescue operations",
        "First aid and medical support",
        "Evacuation assistance"
      ]
    },
    {
      name: "Community Support Center",
      type: "Support Services",
      description: "Central hub for community resources and assistance programs",
      contact: "support@community-center.org",
      icon: <Building className="h-6 w-6 text-green-500" />,
      services: [
        "Emergency shelter coordination",
        "Food and supply distribution",
        "Mental health support",
        "Financial assistance programs",
        "Child care services"
      ]
    },
    {
      name: "Neighborhood Watch Network",
      type: "Community Safety",
      description: "Local network for community safety and emergency preparedness",
      contact: "watch@neighborhood.org",
      icon: <Heart className="h-6 w-6 text-red-500" />,
      services: [
        "Community patrols",
        "Emergency alerts",
        "Neighbor check-ins",
        "Safety workshops",
        "Disaster preparation"
      ]
    },
    {
      name: "Crisis Support Hotline",
      type: "Mental Health",
      description: "24/7 crisis counseling and mental health support",
      contact: "1-800-CRISIS",
      icon: <Phone className="h-6 w-6 text-purple-500" />,
      services: [
        "Crisis counseling",
        "Mental health resources",
        "Suicide prevention",
        "Trauma support",
        "Referral services"
      ]
    },
    {
      name: "Volunteer Network",
      type: "Volunteer Services",
      description: "Connecting volunteers with community needs during emergencies",
      contact: "volunteer@network.org",
      icon: <HandHeart className="h-6 w-6 text-orange-500" />,
      services: [
        "Emergency response volunteers",
        "Food bank assistance",
        "Elder care support",
        "Transportation services",
        "Clean-up crews"
      ]
    },
    {
      name: "Community Outreach Program",
      type: "Outreach Services",
      description: "Reaching vulnerable populations during emergencies",
      contact: "outreach@community.org",
      icon: <Globe className="h-6 w-6 text-cyan-500" />,
      services: [
        "Elderly assistance",
        "Disabled support",
        "Language services",
        "Medical transportation",
        "Home visits"
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
        <h1 className="text-4xl font-bold">Community Support</h1>
      </div>

      {/* Search and Filter */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <div className="relative">
          <Label htmlFor="search">Search Resources</Label>
          <Input
            id="search"
            placeholder="Search community resources..."
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="type">Resource Type</Label>
          <Select>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Resources</SelectItem>
              <SelectItem value="emergency">Emergency Services</SelectItem>
              <SelectItem value="support">Support Services</SelectItem>
              <SelectItem value="mental-health">Mental Health</SelectItem>
              <SelectItem value="volunteer">Volunteer Services</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Select>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="north">North District</SelectItem>
              <SelectItem value="south">South District</SelectItem>
              <SelectItem value="east">East District</SelectItem>
              <SelectItem value="west">West District</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {resources.map((resource) => (
          <Card key={resource.name}>
            <CardHeader>
              <div className="flex items-center gap-3">
                {resource.icon}
                <div>
                  <CardTitle>{resource.name}</CardTitle>
                  <CardDescription>{resource.type}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">{resource.description}</p>
              <div className="mb-4">
                <strong className="text-sm">Services:</strong>
                <ul className="mt-2 space-y-1 text-sm">
                  {resource.services.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MessageCircle className="h-4 w-4" />
                <span>{resource.contact}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Get Involved Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Get Involved</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
            <Link href="#">
              <HandHeart className="h-6 w-6" />
              <span>Volunteer Sign-up</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
            <Link href="#">
              <Users className="h-6 w-6" />
              <span>Join Support Groups</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
            <Link href="#">
              <Globe className="h-6 w-6" />
              <span>Community Events</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 