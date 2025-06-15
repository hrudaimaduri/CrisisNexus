import { ArrowLeft, Package, Heart, Home, Car, Shield, AlertTriangle, CheckSquare } from "lucide-react";
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

interface KitCategory {
  name: string;
  description: string;
  icon: JSX.Element;
  items: {
    name: string;
    quantity: string;
    note?: string;
  }[];
}

export default function EmergencyKitPage() {
  const kitCategories: KitCategory[] = [
    {
      name: "Basic Supplies",
      description: "Essential items for survival and basic needs",
      icon: <Package className="h-6 w-6 text-blue-500" />,
      items: [
        {
          name: "Water",
          quantity: "1 gallon per person per day",
          note: "3-day supply for evacuation, 2-week supply for home"
        },
        {
          name: "Non-perishable Food",
          quantity: "3-day supply",
          note: "Include manual can opener"
        },
        {
          name: "Battery-powered Radio",
          quantity: "1",
          note: "NOAA Weather Radio if possible"
        },
        {
          name: "Flashlight",
          quantity: "1 per person"
        },
        {
          name: "Extra Batteries",
          quantity: "Multiple sets",
          note: "For all battery-powered devices"
        },
        {
          name: "Matches",
          quantity: "2 boxes",
          note: "In waterproof container"
        },
        {
          name: "Multi-tool",
          quantity: "1"
        }
      ]
    },
    {
      name: "First Aid",
      description: "Medical supplies for injuries and health needs",
      icon: <Heart className="h-6 w-6 text-red-500" />,
      items: [
        {
          name: "First Aid Kit",
          quantity: "1 complete kit",
          note: "Check expiration dates regularly"
        },
        {
          name: "Prescription Medications",
          quantity: "7-day supply",
          note: "Keep list of prescriptions"
        },
        {
          name: "Pain Relievers",
          quantity: "1 bottle each type"
        },
        {
          name: "Bandages",
          quantity: "Various sizes"
        },
        {
          name: "Antiseptic Wipes",
          quantity: "1 box"
        },
        {
          name: "Medical Masks",
          quantity: "1 box"
        },
        {
          name: "First Aid Manual",
          quantity: "1"
        }
      ]
    },
    {
      name: "Home Safety",
      description: "Items for home protection and shelter",
      icon: <Home className="h-6 w-6 text-green-500" />,
      items: [
        {
          name: "Fire Extinguisher",
          quantity: "1 per floor",
          note: "Type ABC"
        },
        {
          name: "Smoke Detectors",
          quantity: "1 per bedroom + common areas",
          note: "Check batteries monthly"
        },
        {
          name: "Carbon Monoxide Detector",
          quantity: "1 per floor"
        },
        {
          name: "Emergency Blankets",
          quantity: "1 per person"
        },
        {
          name: "Duct Tape",
          quantity: "2 rolls"
        },
        {
          name: "Plastic Sheeting",
          quantity: "2 large sheets"
        },
        {
          name: "Basic Tool Kit",
          quantity: "1 set"
        }
      ]
    },
    {
      name: "Car Emergency Kit",
      description: "Essential items for vehicle emergencies",
      icon: <Car className="h-6 w-6 text-orange-500" />,
      items: [
        {
          name: "Jumper Cables",
          quantity: "1 set"
        },
        {
          name: "Flares/Reflectors",
          quantity: "3 pieces"
        },
        {
          name: "Ice Scraper",
          quantity: "1"
        },
        {
          name: "Small Shovel",
          quantity: "1"
        },
        {
          name: "Blanket",
          quantity: "1"
        },
        {
          name: "Basic Tool Kit",
          quantity: "1 set"
        },
        {
          name: "First Aid Kit",
          quantity: "1"
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
        <h1 className="text-4xl font-bold">Emergency Kit Checklist</h1>
      </div>

      {/* Important Notice */}
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg mb-8">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1" />
          <div>
            <h3 className="font-semibold text-yellow-600 dark:text-yellow-400">Kit Maintenance</h3>
            <p className="text-yellow-600 dark:text-yellow-400">
              Check your emergency kit every six months. Replace expired items and update supplies based on your family's changing needs.
              Store kit in an easily accessible location known to all family members.
            </p>
          </div>
        </div>
      </div>

      {/* Kit Categories */}
      <div className="grid gap-6">
        {kitCategories.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center gap-3">
                {category.icon}
                <div>
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-3">Item</th>
                      <th className="px-4 py-3">Quantity</th>
                      <th className="px-4 py-3">Notes</th>
                      <th className="px-4 py-3 w-20">Check</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.items.map((item, itemIndex) => (
                      <tr key={itemIndex} className="border-b dark:border-gray-700">
                        <td className="px-4 py-3 font-medium">{item.name}</td>
                        <td className="px-4 py-3">{item.quantity}</td>
                        <td className="px-4 py-3 text-muted-foreground">{item.note || "-"}</td>
                        <td className="px-4 py-3">
                          <div className="flex justify-center">
                            <CheckSquare className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Tips */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-blue-500" />
              <CardTitle>Storage Tips</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 list-disc pl-6">
              <li>Store items in airtight plastic bags</li>
              <li>Keep kit in designated place and ready to "grab and go"</li>
              <li>Make sure all family members know where the kit is located</li>
              <li>Consider preparing smaller kits for your car and workplace</li>
              <li>Store items in easy to carry containers</li>
              <li>Label all items with date of purchase</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <CardTitle>Special Considerations</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 list-disc pl-6">
              <li>Include items for infants if applicable (formula, diapers)</li>
              <li>Pack supplies for pets if needed</li>
              <li>Consider needs of elderly family members</li>
              <li>Include entertainment items for children</li>
              <li>Add personal hygiene items</li>
              <li>Include copies of important documents</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Print Option */}
      <div className="mt-8 flex justify-center">
        <Button variant="outline" className="gap-2">
          <CheckSquare className="h-4 w-4" />
          Print Checklist
        </Button>
      </div>
    </div>
  );
} 