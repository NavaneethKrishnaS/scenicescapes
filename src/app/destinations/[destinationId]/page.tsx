
import { getDestinationById } from '@/lib/destinationData';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import EnquiryPage from '@/app/enquire/page';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { destinations as allDestinations } from '@/lib/destinationData';


interface DestinationDetailPageProps {
  params: {
    destinationId: string;
  };
}

export default function DestinationDetailPage({ params }: DestinationDetailPageProps) {
  const destination = getDestinationById(params.destinationId);

  if (!destination) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid lg:grid-cols-3 gap-12 items-start">
        {/* Left Column: Destination Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-xl overflow-hidden rounded-lg">
            <div className="relative w-full h-[300px] md:h-[450px]">
              <Image
                src={destination.image}
                alt={destination.name}
                layout="fill"
                objectFit="cover"
                priority
                className="rounded-t-lg"
                data-ai-hint={destination.dataAiHint}
              />
            </div>
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl font-bold text-foreground">{destination.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {destination.longDescription || destination.description}
              </p>
              <div className="pt-2">
                <h3 className="text-md font-semibold text-foreground mb-2">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {destination.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-sm px-3 py-1">{tag}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Enquiry Form */}
        <div className="lg:col-span-1 lg:sticky lg:top-24">
          <EnquiryPage defaultDestinationName={destination.name} />
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return allDestinations.map((dest) => ({
    destinationId: dest.id,
  }));
}
