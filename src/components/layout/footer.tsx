import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-card shadow-inner mt-auto">
      <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
        <div className="flex justify-center space-x-6 mb-4">
          <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-accent transition-colors">
            <Facebook size={24} />
          </Link>
          <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-accent transition-colors">
            <Instagram size={24} />
          </Link>
          <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-accent transition-colors">
            <Twitter size={24} />
          </Link>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} WanderLust Concierge. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Crafting unforgettable journeys tailored to you.
        </p>
      </div>
    </footer>
  );
}
