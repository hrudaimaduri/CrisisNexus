import { Mail, Phone, MapPin, Clock, Globe, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Contact Hero Section */}
      <section className="bg-gray-100 dark:bg-gray-900 py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Contact & Emergency Support</h1>
          <p className="text-lg text-muted-foreground">
            We're here to help 24/7. In case of emergency, please contact your local emergency services first.
          </p>
        </div>
      </section>

      <div className="container py-12">
        {/* Emergency Contacts Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-red-600 dark:text-red-500 flex items-center gap-2">
            <AlertCircle className="h-6 w-6" />
            Emergency Numbers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Emergency Services</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-red-600" />
                    <span>Police: 100</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-red-600" />
                    <span>Fire: 101</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-red-600" />
                    <span>Ambulance: 102</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Crisis Helplines</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-red-600" />
                    <span>National Emergency: 112</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-red-600" />
                    <span>Women Helpline: 1091</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-red-600" />
                    <span>Disaster Management: 1070</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Medical Emergency</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-red-600" />
                    <span>Medical Helpline: 108</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-red-600" />
                    <span>COVID-19 Helpline: 1075</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CrisisNexus Contact Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Mail className="h-6 w-6" />
            Contact CrisisNexus
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">General Support</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>Email: support@crisisnexus.com</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>Phone: 1800-CRISIS-IN</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span>Website: www.crisisnexus.in</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Technical Support</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>Email: tech@crisisnexus.in</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>Phone: 1800-TECH-IN</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>24/7 Support Available</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Main Office</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1" />
                    <span>
                      Vardhaman College of Engineering<br />
                      Shamshabad, Kacharam Road<br />
                      Hyderabad, Telangana 501218<br />
                      India
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Hours: 24/7</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Additional Resources Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Globe className="h-6 w-6" />
            Additional Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Government Resources</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="https://ndma.gov.in" className="text-blue-600 hover:underline flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      NDMA - National Disaster Management Authority
                    </a>
                  </li>
                  <li>
                    <a href="https://mha.gov.in" className="text-blue-600 hover:underline flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Ministry of Home Affairs
                    </a>
                  </li>
                  <li>
                    <a href="https://imd.gov.in" className="text-blue-600 hover:underline flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      India Meteorological Department
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Relief Organizations</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="https://indianredcross.org" className="text-blue-600 hover:underline flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Indian Red Cross Society
                    </a>
                  </li>
                  <li>
                    <a href="https://www.pmcares.gov.in" className="text-blue-600 hover:underline flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      PM CARES Fund
                    </a>
                  </li>
                  <li>
                    <a href="https://www.goonj.org" className="text-blue-600 hover:underline flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Goonj - Disaster Relief & Rehabilitation
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
} 