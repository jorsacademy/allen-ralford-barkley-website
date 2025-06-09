# Allen Ralford Barkley - Premium Consulting & Courses

A premium consulting and course-selling website with a luxury aesthetic inspired by Mercedes-Benz EQS. The design features deep navy blue (#0A1733) as the base color with champagne gold (#D4AF37) and soft silver (#CED4DA) accents, creating an elegant and sophisticated look.

## Features

- **Modern UI Components**:
  - Animated hero section with particle background
  - Elegant about section with client trust badges
  - Premium course cards with hover animations
  - Luxury-tier consulting service cards with expandable details
  - Interactive global trust map with animated client pins
  - Floating call-to-action button for discovery calls
  - Clean, minimalist footer

- **Premium Design Elements**:
  - Generous whitespace and clean typography (Playfair Display for headings, Inter for body)
  - Subtle animations using GSAP for scroll effects
  - Mercedes EQS-style vertical scroll progress indicator
  - Elegant micro-interactions on hover states
  - Particle background effects for visual depth

## Technical Stack

- **Framework**: Nuxt 3
- **Styling**: TailwindCSS
- **Animations**: GSAP + ScrollTrigger
- **Language**: TypeScript/JavaScript

## Project Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

- **`/components`**: Vue components used throughout the site
  - `NavBar.vue`: Navigation bar with vertical scroll indicator
  - `HeroSection.vue`: Full-screen hero with animated particles
  - `AboutSection.vue`: About section with client trust badges
  - `CoursesSection.vue`: Course cards with filtering
  - `ConsultingSection.vue`: Consulting services with expandable cards
  - `GlobalTrustSection.vue`: Interactive world map with client pins
  - `CallToAction.vue`: Floating action button for discovery calls
  - `FooterSection.vue`: Minimal footer with essential links

- **`/pages`**: Nuxt pages
  - `index.vue`: Main homepage

- **`/assets`**: Static assets
  - `/css/main.css`: Global CSS styles

## Design Specifications

- **Colors**:
  - Primary (Navy): #0A1733
  - Secondary (Gold): #D4AF37
  - Accent (Silver): #CED4DA

- **Typography**:
  - Headings: Playfair Display (serif)
  - Body: Inter (sans-serif)

- **Breakpoints**:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: 1024px - 1440px
  - Ultra-wide: > 1440px

## Requirements

- Node.js 16+ and npm

## License

All rights reserved. This is a proprietary project.
