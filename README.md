# ScenicEscapes (WanderLust Concierge)

A Next.js travel inquiry app built with Firebase Studio starter, Tailwind CSS, and shadcn/ui.

## Blueprint & Specs

See [docs/blueprint.md](docs/blueprint.md) for detailed requirements, feature specs, and style guidelines.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and set environment variables.

3. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── app/                     Next.js App Router pages and API routes
├── components/              Reusable UI components (shadcn/ui)
├── lib/                     Utility functions and helpers
└── hooks/                   Custom React hooks

docs/
└── blueprint.md            Feature and style specifications

config files:
- next.config.ts            Next.js configuration
- tailwind.config.ts        Tailwind CSS configuration
- components.json           shadcn/ui setup
- .env.example              Environment variable definitions
```

## Features Implemented

- Informational pages: Home, About, Destinations, Contact
- Inquiry form UI scaffold (Enquire page)
- Razorpay webhook endpoint with signature verification stub
- Tailwind CSS and shadcn/ui integration

## Gaps & Next Steps

- Implement inquiry form submission, reCAPTCHA v2 integration, and backend API handler.
- Integrate email sending for inquiries and payment confirmations.
- Refine styling to match the Lavender/Gray/Purple palette and replace placeholder images.
