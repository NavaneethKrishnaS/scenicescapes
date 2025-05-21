
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { destinations } from '@/lib/destinationData'; // Updated import

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
                {/* Updated Link to point to the dynamic destination page */}
                <Link href={`/destinations/${dest.id}`} className="w-full">
                  <Button variant="default" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    View Details <MapPin className="ml-2 h-4 w-4" />
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
