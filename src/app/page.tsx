import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Briefcase, Globe, Users, CheckCircle, DollarSign, MapPin, TrendingUp } from 'lucide-react';

const featuredDestinations = [
  {
    name: 'Paris, France',
    description: 'Experience the romance and charm of the City of Lights.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'paris france',
    link: '/destinations#paris',
  },
  {
    name: 'Kyoto, Japan',
    description: 'Discover ancient temples and serene gardens in Japan\'s cultural heart.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'kyoto japan',
    link: '/destinations#kyoto',
  },
  {
    name: 'Rome, Italy',
    description: 'Explore historic ruins and savor authentic Italian cuisine.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'rome italy',
    link: '/destinations#rome',
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center rounded-lg overflow-hidden shadow-xl">
        <Image
          src="https://placehold.co/1200x600.png"
          alt="Breathtaking travel destination"
          layout="fill"
          objectFit="cover"
          className="absolute z-0 opacity-60"
          data-ai-hint="travel landscape"
        />
        <div className="relative z-10 p-8 bg-black/50 rounded-lg">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in-down">
            Your Journey Begins Here
          </h1>
          <p className="text-xl text-gray-200 mb-8 animate-fade-in-up">
            Discover tailored travel experiences with WanderLust Concierge.
          </p>
          <Link href="/enquire">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 animate-fade-in-up animation-delay-200">
              Plan Your Dream Trip
              <TrendingUp className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-10 text-foreground">Why WanderLust Concierge?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                <Award className="h-10 w-10" />
              </div>
              <CardTitle className="text-xl">Expert Curation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our travel experts meticulously plan every detail for a seamless experience.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                <Users className="h-10 w-10" />
              </div>
              <CardTitle className="text-xl">Personalized Service</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We tailor your itinerary to your unique preferences and travel style.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                <DollarSign className="h-10 w-10" />
              </div>
              <CardTitle className="text-xl">Exclusive Value</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Access to special rates, unique experiences, and hidden gems.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-10 text-foreground">Featured Destinations</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {featuredDestinations.map((dest) => (
            <Card key={dest.name} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="relative h-60 w-full">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint={dest.dataAiHint}
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{dest.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{dest.description}</p>
              </CardContent>
              <CardFooter>
                <Link href={dest.link} className="w-full">
                  <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                    Explore <MapPin className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/destinations">
            <Button size="lg" variant="ghost" className="text-accent hover:bg-accent/10 hover:text-accent">
              View All Destinations
            </Button>
          </Link>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-primary/20 rounded-lg shadow-md">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary-foreground">Ready for an Adventure?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let us craft your next unforgettable journey. Contact our travel experts today and turn your dream vacation into reality.
          </p>
          <Link href="/enquire">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Get Started Now
              <CheckCircle className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
