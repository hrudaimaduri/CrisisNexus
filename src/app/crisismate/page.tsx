export default function CrisisMatePage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-4">CrisisMate</h1>
      <p className="text-muted-foreground mb-6">
        CrisisMate is your 24/7 disaster safety companion. It offers step-by-step guidance,
        calm voice prompts, and mental health support during emergencies. Use the red button
        at the bottom-right on any page to open the assistant.
      </p>
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">What CrisisMate can do</h2>
          <ul className="list-disc pl-6 mt-2 text-sm">
            <li>Safety instructions for earthquakes, floods, fires, cyclones, and heatwaves</li>
            <li>Polite, reassuring tone with optional text-to-speech</li>
            <li>Quick tips and checklists for evacuation and emergency kits</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Important</h2>
          <p className="text-sm mt-2 text-muted-foreground">
            CrisisMate is an information tool and does not replace local emergency services. In
            immediate danger, call your local emergency number.
          </p>
        </div>
      </div>
    </div>
  );
}


