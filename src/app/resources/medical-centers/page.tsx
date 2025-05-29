import { ArrowLeft, Search, Building2, Phone, Clock, MapPin, Star, Filter } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MedicalCenter {
  name: string;
  type: string;
  address: string;
  phone: string;
  hours: string;
  services: string[];
  emergency: boolean;
  rating: number;
  distance: string;
}

export default function MedicalCentersPage() {
  const centers: MedicalCenter[] = [
    {
      name: "City General Hospital",
      type: "Hospital",
      address: "123 Healthcare Ave, City Center",
      phone: "555-0100",
      hours: "24/7",
      services: [
        "Emergency Care",
        "Surgery",
        "Intensive Care",
        "Pediatrics",
        "Cardiology"
      ],
      emergency: true,
      rating: 4.5,
      distance: "0.8 miles"
    },
    {
      name: "Community Medical Center",
      type: "Urgent Care",
      address: "456 Wellness Blvd, Westside",
      phone: "555-0200",
      hours: "8:00 AM - 10:00 PM",
      services: [
        "Urgent Care",
        "X-Ray",
        "Lab Services",
        "Physical Therapy"
      ],
      emergency: false,
      rating: 4.2,
      distance: "1.2 miles"
    },
    {
      name: "Children's Medical Hospital",
      type: "Specialty Hospital",
      address: "789 Care Lane, Eastside",
      phone: "555-0300",
      hours: "24/7",
      services: [
        "Pediatric Emergency",
        "Neonatal Care",
        "Child Surgery",
        "Pediatric Oncology"
      ],
      emergency: true,
      rating: 4.8,
      distance: "2.5 miles"
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
        <h1 className="text-4xl font-bold">Medical Centers</h1>
      </div>

      {/* Search and Filters */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search medical centers..."
            className="pl-9"
          />
        </div>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Facility Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Facilities</SelectItem>
            <SelectItem value="hospital">Hospitals</SelectItem>
            <SelectItem value="urgent">Urgent Care</SelectItem>
            <SelectItem value="specialty">Specialty Centers</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Distance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Within 1 mile</SelectItem>
            <SelectItem value="5">Within 5 miles</SelectItem>
            <SelectItem value="10">Within 10 miles</SelectItem>
            <SelectItem value="20">Within 20 miles</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Emergency Notice */}
      <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-lg mb-8">
        <p className="text-red-600 dark:text-red-400 font-medium">
          For medical emergencies, call 911 immediately. Not all facilities offer emergency services.
        </p>
      </div>

      {/* Medical Centers List */}
      <div className="grid gap-6">
        {centers.map((center, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Center Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-bold mb-1">{center.name}</h2>
                      <p className="text-muted-foreground">{center.type}</p>
                    </div>
                    {center.emergency && (
                      <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                        24/7 Emergency
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{center.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{center.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{center.hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span>{center.rating} • {center.distance}</span>
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="md:w-80">
                  <h3 className="font-medium mb-2">Available Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {center.services.map((service, serviceIndex) => (
                      <span
                        key={serviceIndex}
                        className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col gap-3 md:w-40">
                  <Button className="flex-1" asChild>
                    <Link href={`tel:${center.phone}`}>
                      Call Now
                    </Link>
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Get Directions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Information */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Understanding Facility Types</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li>
                <span className="font-medium">Hospitals:</span>
                <p className="text-muted-foreground">Full-service medical facilities with emergency departments, specialized care, and inpatient services.</p>
              </li>
              <li>
                <span className="font-medium">Urgent Care Centers:</span>
                <p className="text-muted-foreground">Walk-in clinics for non-life-threatening conditions, typically with extended hours.</p>
              </li>
              <li>
                <span className="font-medium">Specialty Centers:</span>
                <p className="text-muted-foreground">Focused care for specific conditions or patient groups (e.g., pediatrics, cancer care).</p>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>When to Choose Each Facility</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li>
                <span className="font-medium">Emergency Room:</span>
                <p className="text-muted-foreground">Life-threatening conditions, severe injuries, chest pain, stroke symptoms.</p>
              </li>
              <li>
                <span className="font-medium">Urgent Care:</span>
                <p className="text-muted-foreground">Minor injuries, fever, flu symptoms, sprains, minor cuts requiring stitches.</p>
              </li>
              <li>
                <span className="font-medium">Primary Care:</span>
                <p className="text-muted-foreground">Regular check-ups, chronic condition management, preventive care.</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 