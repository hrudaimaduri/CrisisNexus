import Link from "next/link";
import { ArrowRight, AlertTriangle, Grid2X2, Volume2, MapPin, Phone, Mail, Clock, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LearnMoreButton } from "@/components/learn-more-button";
import { DisasterMap } from "@/components/map/disaster-map";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <header className="w-full border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold">
                CN
              </div>
              <span className="text-xl font-medium">CrisisNexus</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium">
              Home
            </Link>
            <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/alerts" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Alerts
            </Link>
            <Link href="/resources" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Resources
            </Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Contact
            </Link>
            <Link href="/crisismate" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              CrisisMate
            </Link>
          </nav>
          
          <div>
            {/* Removed Access Dashboard button */}
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gray-100 dark:bg-gray-900 py-16 md:py-24">
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
              Stay Safe. Stay Informed.
              <span className="text-red-600 dark:text-red-500 block mt-2">When Disaster Strikes.</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-3xl">
              CrisisNexus provides real-time disaster alerts and life-saving instructions,
              even when you're not looking at your phone.
            </p>
            <div className="flex gap-4 mt-10">
              <Button size="lg" className="bg-red-600 hover:bg-red-700" asChild>
                <Link href="/dashboard">Get Started</Link>
              </Button>
              <LearnMoreButton />
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-16 md:py-24">
          <div className="container flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">Life-Saving Features</h2>
            <p className="text-xl text-muted-foreground mb-16 text-center max-w-3xl">
              CrisisNexus is designed to keep you and your loved ones safe during emergencies.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border rounded-lg p-8 bg-card">
                <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mb-6">
                  <MapPin className="h-6 w-6 text-red-600 dark:text-red-500" />
                </div>
                <h3 className="text-xl font-bold mb-4">Comprehensive Dashboard</h3>
                <p className="text-muted-foreground">
                  Monitor disasters in your area and around the world with our intuitive dashboard. 
                  Get a complete overview of current situations at a glance.
                </p>
              </div>
              
              <div className="border rounded-lg p-8 bg-card">
                <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mb-6">
                  <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-500" />
                </div>
                <h3 className="text-xl font-bold mb-4">Proximity Alerts</h3>
                <p className="text-muted-foreground">
                  Receive immediate alerts when disasters occur near your location, with step-by-step 
                  instructions to keep you safe.
                </p>
              </div>
              
              <div className="border rounded-lg p-8 bg-card">
                <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mb-6">
                  <Volume2 className="h-6 w-6 text-red-600 dark:text-red-500" />
                </div>
                <h3 className="text-xl font-bold mb-4">Emergency Sound Alerts</h3>
                <p className="text-muted-foreground">
                  Our system emits loud, attention-grabbing alerts even when your app is closed, 
                  ensuring you never miss critical information.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Dashboard Overview Section */}
        <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-900">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="flex-1">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Real-Time Disaster Dashboard</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Our comprehensive dashboard provides up-to-the-minute information 
                  on disasters happening in your country or state. 
                  Monitor floods, earthquakes, wildfires, and more.
                </p>
                <Button className="gap-2" asChild>
                  <Link href="/dashboard">
                    View Dashboard Demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="flex-1 bg-card rounded-xl overflow-hidden shadow-2xl border">
                <div className="w-full h-full">
                  {/* Dashboard Preview */}
                  <div className="p-4">
                    {/* Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                        <div className="text-red-600 dark:text-red-400 text-sm font-medium">Active Alerts</div>
                        <div className="text-2xl font-bold mt-1">3</div>
                        <div className="text-xs text-red-600/70 dark:text-red-400/70">2 in your area</div>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <div className="text-blue-600 dark:text-blue-400 text-sm font-medium">Locations</div>
                        <div className="text-2xl font-bold mt-1">5</div>
                        <div className="text-xs text-blue-600/70 dark:text-blue-400/70">Major cities</div>
                      </div>
                      <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                        <div className="text-amber-600 dark:text-amber-400 text-sm font-medium">Warnings</div>
                        <div className="text-2xl font-bold mt-1">2</div>
                        <div className="text-xs text-amber-600/70 dark:text-amber-400/70">Last 24 hours</div>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                        <div className="text-green-600 dark:text-green-400 text-sm font-medium">Safe Areas</div>
                        <div className="text-2xl font-bold mt-1">12</div>
                        <div className="text-xs text-green-600/70 dark:text-green-400/70">No active alerts</div>
                      </div>
                    </div>

                    {/* Map Preview */}
                    <div className="relative aspect-[16/9] bg-card rounded-lg mb-4 overflow-hidden border">
                      <DisasterMap />
                    </div>

                    {/* Alert Preview */}
                    <div className="space-y-2">
                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                          <span className="text-sm font-medium text-red-600 dark:text-red-400">High Priority Alert</span>
                        </div>
                        <p className="text-xs text-red-600/70 dark:text-red-400/70 mt-1">
                          Flood warning in New Delhi region - Immediate evacuation recommended
                        </p>
                      </div>
                      <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          <span className="text-sm font-medium text-amber-600 dark:text-amber-400">Weather Advisory</span>
                        </div>
                        <p className="text-xs text-amber-600/70 dark:text-amber-400/70 mt-1">
                          Heavy rainfall expected in Mumbai over next 24 hours
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Disaster Types Section */}
        <section className="py-16 md:py-24">
          <div className="container flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">Be Prepared for Any Disaster</h2>
            <p className="text-xl text-muted-foreground mb-16 text-center max-w-3xl">
              CrisisNexus provides coverage for all major natural and man-made disasters.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl">
              <div className="flex flex-col items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="h-8 w-8 text-red-600 dark:text-red-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold">Floods</h3>
              </div>
              
              <div className="flex flex-col items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="h-8 w-8 text-red-600 dark:text-red-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                </div>
                <h3 className="text-lg font-bold">Earthquakes</h3>
              </div>
              
              <div className="flex flex-col items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="h-8 w-8 text-red-600 dark:text-red-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 2 L3 8 l18 0 L15 2 Q9 2 9 2"></path>
                    <path d="M3 8 Q1 14 12 22 Q23 14 21 8"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold">Cyclones</h3>
              </div>
              
              <div className="flex flex-col items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="h-8 w-8 text-red-600 dark:text-red-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v10M8 10h8M5 20h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-2a1 1 0 0 1-1-1v0a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v0a1 1 0 0 1-1 1H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold">Wildfires</h3>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-red-600 dark:bg-red-800 text-white">
          <div className="container flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Don't Wait Until It's Too Late</h2>
            <p className="text-xl mb-10 max-w-3xl">
              Access CrisisNexus today and ensure you and your loved ones are prepared for any emergency.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 dark:hover:bg-gray-200" asChild>
                <Link href="/dashboard">Access Dashboard</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t py-12 bg-gray-100 dark:bg-gray-900">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold">
                  CN
                </div>
                <span className="text-xl font-medium">CrisisNexus</span>
              </div>
              <p className="text-muted-foreground">
                Providing life-saving disaster alerts and information when you need it most.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-muted-foreground hover:text-foreground">Home</Link></li>
                <li><Link href="/dashboard" className="text-muted-foreground hover:text-foreground">Dashboard</Link></li>
                <li><Link href="/alerts" className="text-muted-foreground hover:text-foreground">Alerts</Link></li>
                <li><Link href="/resources" className="text-muted-foreground hover:text-foreground">Resources</Link></li>
                <li><Link href="/crisismate" className="text-muted-foreground hover:text-foreground">CrisisMate</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Emergency Services</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">First Aid Guide</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Evacuation Plans</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Emergency Kit Checklist</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Weather Alerts</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Medical Centers</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Shelter Locations</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Mental Health Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Emergency: 911</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Crisis Help: 1-800-CRISIS</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">support@crisisnexus.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">24/7 Support Available</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
            <p>© 2023 CrisisNexus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}