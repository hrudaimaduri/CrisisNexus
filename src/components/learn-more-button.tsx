"use client";

import { Button } from "@/components/ui/button";

export function LearnMoreButton() {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Button size="lg" variant="outline" onClick={scrollToFeatures}>
      Learn More
    </Button>
  );
} 