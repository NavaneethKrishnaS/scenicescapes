import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin as MapPinIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Get In Touch</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          We'd love to hear from you! Whether you have a question about our services, destinations, or want to plan your next trip, our team is ready to assist you.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8 items-start">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary text-primary-foreground p-3 rounded-full">
                <MapPinIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Our Office</h3>
                <p className="text-muted-foreground">123 Travel Lane, Wanderlust City, WL 54321</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary text-primary-foreground p-3 rounded-full">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Phone</h3>
                <a href="tel:+1234567890" className="text-muted-foreground hover:text-accent transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary text-primary-foreground p-3 rounded-full">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Email</h3>
                <a href="mailto:hello@wanderlustconcierge.com" className="text-muted-foreground hover:text-accent transition-colors">
                  hello@wanderlustconcierge.com
                </a>
              </div>
            </div>
            <div className="pt-4">
              <Link href="/enquire">
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  Send an Enquiry
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Find Us Here</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder for map integration */}
            <div className="bg-muted rounded-lg h-80 flex items-center justify-center">
              <Image 
                src="https://placehold.co/600x400.png" 
                alt="Map placeholder" 
                width={600} 
                height={400}
                className="rounded-md object-cover w-full h-full"
                data-ai-hint="world map"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">Map functionality coming soon.</p>
          </CardContent>
        </Card>
      </section>

      <section className="text-center py-8 bg-primary/10 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-primary-foreground mb-3">Office Hours</h2>
        <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
        <p className="text-muted-foreground">Saturday: 10:00 AM - 4:00 PM</p>
        <p className="text-muted-foreground">Sunday: Closed</p>
      </section>
    </div>
  );
}
