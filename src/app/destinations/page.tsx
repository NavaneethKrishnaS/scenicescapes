import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Sun, Mountain, Waves, Castle } from 'lucide-react';

const destinations = [
  {
    id: 'paris',
    name: 'Paris, France',
    description: 'The City of Lights offers iconic landmarks, romantic ambiance, world-class museums, and exquisite cuisine.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'paris france',
    icon: <Castle className="h-6 w-6 text-primary" />,
    tags: ['Europe', 'City Break', 'Culture', 'Romance'],
  },
  {
    id: 'kyoto',
    name: 'Kyoto, Japan',
    description: 'Immerse yourself in traditional Japanese culture with stunning temples, serene gardens, and vibrant geisha districts.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'kyoto japan',
    icon: <Mountain className="h-6 w-6 text-primary" />,
    tags: ['Asia', 'Culture', 'History', 'Nature'],
  },
  {
    id: 'rome',
    name: 'Rome, Italy',
    description: 'Explore ancient ruins like the Colosseum, Vatican City, and indulge in delicious Italian food and art.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'rome italy',
    icon: <Castle className="h-6 w-6 text-primary" />,
    tags: ['Europe', 'History', 'City Break', 'Food'],
  },
  {
    id: 'bali',
    name: 'Bali, Indonesia',
    description: 'Known as the Island of Gods, Bali offers beautiful beaches, lush rice paddies, spiritual retreats, and vibrant culture.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'bali indonesia',
    icon: <Waves className="h-6 w-6 text-primary" />,
    tags: ['Asia', 'Beach', 'Nature', 'Wellness'],
  },
  {
    id: 'new-york',
    name: 'New York City, USA',
    description: 'The city that never sleeps, offering iconic sights, Broadway shows, diverse neighborhoods, and endless entertainment.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'newyork city',
    icon: <Sun className="h-6 w-6 text-primary" />,
    tags: ['North America', 'City Break', 'Entertainment', 'Culture'],
  },
  {
    id: 'cape-town',
    name: 'Cape Town, South Africa',
    description: 'Stunning natural beauty with Table Mountain, beautiful beaches, vibrant culture, and nearby wine regions.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'capetown africa',
    icon: <Mountain className="h-6 w-6 text-primary" />,
    tags: ['Africa', 'Nature', 'Adventure', 'City Break'],
  },
];

export default function DestinationsPage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Explore Our Destinations</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Discover a world of adventure. From bustling cities to serene landscapes, find your perfect getaway.
        </p>
      </section>

      <section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <Card key={dest.id} id={dest.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="relative h-64 w-full">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint={dest.dataAiHint}
                />
                <div className="absolute top-4 right-4 bg-background/80 p-2 rounded-full shadow-md">
                  {dest.icon}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">{dest.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-3">{dest.description}</p>
                <div className="flex flex-wrap gap-2">
                  {dest.tags.map(tag => (
                    <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/enquire?to=${encodeURIComponent(dest.name)}`} className="w-full">
                  <Button variant="default" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    Enquire About {dest.name} <MapPin className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
