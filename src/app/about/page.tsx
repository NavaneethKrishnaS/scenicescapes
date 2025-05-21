import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Globe, Heart, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">About WanderLust Concierge</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          We are passionate about creating extraordinary travel experiences that go beyond the ordinary. 
          Our mission is to turn your travel dreams into reality with personalized service and expert guidance.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <Image
            src="https://placehold.co/600x400.png"
            alt="WanderLust Concierge Team"
            width={600}
            height={400}
            className="rounded-lg shadow-xl"
            data-ai-hint="travel team"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-foreground">Our Story</h2>
          <p className="text-muted-foreground leading-relaxed">
            Founded by a group of avid travelers, WanderLust Concierge was born from a desire to share the joy of discovery and exploration. We believe that travel has the power to transform, inspire, and create lifelong memories.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            With years of collective experience in the travel industry, our team has cultivated strong relationships with partners worldwide, enabling us to offer unique and exclusive opportunities to our clients.
          </p>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-10 text-foreground">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                <Heart className="h-8 w-8" />
              </div>
              <CardTitle className="text-xl">Passion for Travel</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We love what we do, and our enthusiasm for travel shines through in every itinerary we create.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                <Users className="h-8 w-8" />
              </div>
              <CardTitle className="text-xl">Client-Centric</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your needs and desires are at the heart of our planning process. We listen, adapt, and deliver.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                <Globe className="h-8 w-8" />
              </div>
              <CardTitle className="text-xl">Authentic Experiences</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We strive to provide genuine cultural encounters and immersive journeys.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="text-center py-8 bg-accent/10 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-accent mb-4">Meet Our Experts</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
          Our team of dedicated travel advisors is committed to providing exceptional service. With in-depth knowledge of destinations around the globe, we are here to guide you every step of the way.
        </p>
        <div className="flex justify-center space-x-4">
           <Image src="https://placehold.co/100x100.png" alt="Travel Expert 1" width={100} height={100} className="rounded-full shadow-md" data-ai-hint="person portrait" />
           <Image src="https://placehold.co/100x100.png" alt="Travel Expert 2" width={100} height={100} className="rounded-full shadow-md" data-ai-hint="person portrait" />
           <Image src="https://placehold.co/100x100.png" alt="Travel Expert 3" width={100} height={100} className="rounded-full shadow-md" data-ai-hint="person portrait" />
        </div>
      </section>
    </div>
  );
}
