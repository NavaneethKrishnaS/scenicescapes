
import type { ComponentType } from 'react';
import type { LucideProps } from 'lucide-react';
import { Castle, Mountain, Waves, Sun } from 'lucide-react';

export interface Destination {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  dataAiHint: string;
  icon: ComponentType<LucideProps>;
  tags: string[];
}

export const destinations: Destination[] = [
  {
    id: 'paris',
    name: 'Paris, France',
    description: 'The City of Lights offers iconic landmarks, romantic ambiance, world-class museums, and exquisite cuisine.',
    longDescription: 'Paris, France’s capital, is a major European city and a global center for art, fashion, gastronomy and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine. Beyond such landmarks as the Eiffel Tower and the 12th-century, Gothic Notre-Dame cathedral, the city is known for its cafe culture and designer boutiques along the Rue du Faubourg Saint-Honoré. Enjoy world-class art at the Louvre, home to da Vinci’s "Mona Lisa." Stroll through charming neighborhoods like Montmartre or Le Marais, and indulge in exquisite French pastries.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'paris france',
    icon: Castle,
    tags: ['Europe', 'City Break', 'Culture', 'Romance'],
  },
  {
    id: 'kyoto',
    name: 'Kyoto, Japan',
    description: 'Immerse yourself in traditional Japanese culture with stunning temples, serene gardens, and vibrant geisha districts.',
    longDescription: 'Kyoto, once the capital of Japan, is a city on the island of Honshu. It\'s famous for its numerous classical Buddhist temples, as well as gardens, imperial palaces, Shinto shrines and traditional wooden houses. It’s also known for formal traditions such as kaiseki dining, consisting of multiple courses of precise dishes, and geisha, female entertainers often found in the Gion district. Wander through the magical Arashiyama Bamboo Grove, visit the Golden Pavilion (Kinkaku-ji), and experience the tranquility of Ryoan-ji Temple\'s rock garden.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'kyoto japan',
    icon: Mountain,
    tags: ['Asia', 'Culture', 'History', 'Nature'],
  },
  {
    id: 'rome',
    name: 'Rome, Italy',
    description: 'Explore ancient ruins like the Colosseum, Vatican City, and indulge in delicious Italian food and art.',
    longDescription: 'Rome, Italy’s capital, is a sprawling, cosmopolitan city with nearly 3,000 years of globally influential art, architecture and culture on display. Ancient ruins such as the Forum and the Colosseum evoke the power of the former Roman Empire. Vatican City, headquarters of the Roman Catholic Church, has St. Peter’s Basilica and the Vatican Museums, which house masterpieces such as Michelangelo’s Sistine Chapel frescoes. Toss a coin into the Trevi Fountain, climb the Spanish Steps, and get lost in the charming streets of Trastevere while savoring authentic gelato.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'rome italy',
    icon: Castle,
    tags: ['Europe', 'History', 'City Break', 'Food'],
  },
  {
    id: 'bali',
    name: 'Bali, Indonesia',
    description: 'Known as the Island of Gods, Bali offers beautiful beaches, lush rice paddies, spiritual retreats, and vibrant culture.',
    longDescription: 'Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs. The island is home to religious sites such as cliffside Uluwatu Temple. To the south, the beachside city of Kuta has lively bars, while Seminyak, Sanur and Nusa Dua are popular resort towns. The island is also known for its yoga and meditation retreats. Explore ancient temples, surf world-class waves, discover vibrant markets in Ubud, and witness stunning sunsets over the Indian Ocean.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'bali indonesia',
    icon: Waves,
    tags: ['Asia', 'Beach', 'Nature', 'Wellness'],
  },
  {
    id: 'new-york',
    name: 'New York City, USA',
    description: 'The city that never sleeps, offering iconic sights, Broadway shows, diverse neighborhoods, and endless entertainment.',
    longDescription: 'New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that’s among the world’s major commercial, financial and cultural centers. Its iconic sites include skyscrapers such as the Empire State Building and sprawling Central Park. Broadway theater is staged in neon-lit Times Square. Visit world-renowned museums like the Met and MoMA, take a ferry to the Statue of Liberty, and experience the diverse culinary scene across its vibrant neighborhoods.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'newyork city',
    icon: Sun,
    tags: ['North America', 'City Break', 'Entertainment', 'Culture'],
  },
  {
    id: 'cape-town',
    name: 'Cape Town, South Africa',
    description: 'Stunning natural beauty with Table Mountain, beautiful beaches, vibrant culture, and nearby wine regions.',
    longDescription: 'Cape Town is a port city on South Africa’s southwest coast, on a peninsula beneath the imposing Table Mountain. Slowly rotating cable cars climb to the mountain’s flat top, from which there are sweeping views of the city, the busy harbor and boats heading for Robben Island, the notorious prison that once held Nelson Mandela, which is now a living museum. Hike or take a cable car up Table Mountain, visit the penguins at Boulders Beach, explore the colorful Bo-Kaap neighborhood, and tour the scenic Cape Winelands.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'capetown africa',
    icon: Mountain,
    tags: ['Africa', 'Nature', 'Adventure', 'City Break'],
  },
];

export const getDestinationById = (id: string): Destination | undefined => {
  return destinations.find(dest => dest.id === id);
};
