import { Heart, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FirstAidGuide {
  title: string;
  content: string[];
}

export default function FirstAidGuidePage() {
  const guides: FirstAidGuide[] = [
    {
      title: "CPR (Cardiopulmonary Resuscitation)",
      content: [
        "1. Check the scene for safety",
        "2. Check responsiveness and breathing",
        "3. Call emergency services (911)",
        "4. Begin chest compressions:",
        "   - Place hands in center of chest",
        "   - Push hard and fast (100-120 compressions per minute)",
        "   - Allow chest to fully recoil",
        "5. Give rescue breaths if trained",
        "6. Continue CPR until help arrives"
      ]
    },
    {
      title: "Bleeding and Wounds",
      content: [
        "1. Clean your hands and wear gloves if available",
        "2. Apply direct pressure with clean cloth or gauze",
        "3. Keep pressure constant for at least 15 minutes",
        "4. Clean the wound if possible",
        "5. Apply antibiotic ointment if available",
        "6. Bandage the wound",
        "7. Seek medical attention if:",
        "   - Bleeding doesn't stop",
        "   - Wound is deep or gaping",
        "   - Signs of infection appear"
      ]
    },
    {
      title: "Burns",
      content: [
        "1. Remove from source of burn",
        "2. Cool the burn with cool (not cold) water",
        "3. Remove any jewelry or tight items",
        "4. Cover with sterile, non-stick bandage",
        "5. Do not:",
        "   - Break blisters",
        "   - Apply ice",
        "   - Use butter or ointments",
        "6. Seek immediate medical attention for:",
        "   - Third-degree burns",
        "   - Large or deep burns",
        "   - Burns on face, hands, feet, or joints"
      ]
    },
    {
      title: "Choking",
      content: [
        "For conscious adult or child:",
        "1. Give 5 back blows between shoulder blades",
        "2. Perform Heimlich maneuver:",
        "   - Stand behind person",
        "   - Wrap arms around waist",
        "   - Make fist with one hand",
        "   - Place fist above navel",
        "   - Grasp fist with other hand",
        "   - Give quick, upward thrusts",
        "3. Repeat until object is expelled",
        "4. Seek medical attention afterward"
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
        <h1 className="text-4xl font-bold">First Aid Guide</h1>
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search first aid procedures..."
          className="pl-9"
        />
      </div>

      {/* Emergency Notice */}
      <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-lg mb-8">
        <p className="text-red-600 dark:text-red-400 font-medium">
          For life-threatening emergencies, call emergency services (911) immediately.
          This guide is for informational purposes and basic first aid only.
        </p>
      </div>

      {/* First Aid Guides */}
      <Accordion type="single" collapsible className="w-full">
        {guides.map((guide, index) => (
          <AccordionItem key={guide.title} value={`item-${index}`}>
            <AccordionTrigger className="text-lg">
              {guide.title}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 text-muted-foreground">
                {guide.content.map((step, stepIndex) => (
                  <li key={stepIndex} className="ml-4">
                    {step}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Additional Resources */}
      <div className="mt-12 p-6 bg-muted rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Button variant="outline" className="w-full" asChild>
            <Link href="#">Download First Aid Manual (PDF)</Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="#">Find First Aid Training Near You</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 