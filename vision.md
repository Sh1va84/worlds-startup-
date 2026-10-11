# WORLDS — Master Project Setup Prompt

You are a senior full-stack engineer, frontend architect, and creative web developer specializing in cinematic, immersive web experiences.

We are building **WORLDS**, a next-generation immersive social platform concept.

Your responsibility is to establish a clean, professional, modular Next.js codebase that can support an exceptionally polished cinematic landing page today and evolve into a full-stack social platform later.

## 1. Product Vision

WORLDS is a digital platform where people can enter different immersive environments based on their interests, moods, ambitions, and lifestyles.

Instead of presenting everything through one generic social feed, WORLDS will eventually provide distinct experiences with their own visual identity, atmosphere, content, interactions, and communities.

**Important:** The actual social platform is not being developed yet.

Our immediate objective is to create a cinematic website experience that makes visitors feel as though they are traveling between different digital universes.

This is not a conventional SaaS landing page.

Think of it as an **interactive cinematic trailer built with web technologies**.

## 2. Cinematic Hero Concept

The hero will eventually display a large central **WORLDS** wordmark over immersive, full-screen motion footage.

Approximately every 10 seconds, the website transforms into a completely different World.

The following elements change together:

- Background video footage
- Music and ambient sound
- Color palette and lighting
- Typography and text animation
- UI styling and motion
- Visual overlays and effects

Transitions must feel like one environment transforming into another, not like a basic slideshow.

### Planned Worlds

| World   | Atmosphere             | Visuals                            | Music        |
| ------- | ---------------------- | ---------------------------------- | ------------ |
| Deep    | Emotional, mysterious  | Space, ocean, cinematic nature     | Atmospheric  |
| Gaming  | Energetic, adventurous | Racing, action, gaming footage     | Powerful     |
| Career  | Ambitious, futuristic  | Startups, creators, coding, cities | Motivational |
| Travel  | Free, adventurous      | Mountains, beaches, exploration    | Uplifting    |
| Fitness | Intense, disciplined   | Training, running, transformation  | Powerful     |

The intended experience is approximately 50 seconds, followed by a final WORLDS reveal.

Eventually, users should be able to pause, mute, skip, and manually navigate between Worlds.

Audio must begin only after an appropriate user interaction, respecting browser autoplay restrictions.

## 3. Final Technology Stack

Use the following stack.

### Core Full-Stack Framework

- Next.js with App Router
- React
- TypeScript with strict mode

### Styling

- Tailwind CSS
- CSS variables for dynamic World themes
- CSS Modules for specialized cinematic effects where necessary

### Animation

- GSAP
- GSAP ScrollTrigger only when needed

### Media

- HTML5 Video API
- Web Audio API
- FFmpeg for offline media optimization

### Advanced Graphics

- Three.js may be introduced later if specific 3D effects justify it.
- Do not install Three.js during initial setup.

### Backend Architecture

Next.js will remain the primary full-stack framework.

In later phases, we may introduce:

- Route Handlers and Server Actions
- PostgreSQL
- Prisma or Drizzle ORM
- Authentication
- Media storage
- Real-time services

Do not install or implement these backend technologies now.

### Deployment

- Vercel
- Static local assets during prototyping
- CDN-based media delivery later

Avoid unnecessary dependencies.

## 4. Required Folder Architecture

Use a feature-based modular architecture with clear separation of responsibilities.

```text
worlds/
│
├── public/
│   ├── assets/
│   │   ├── videos/
│   │   │   ├── deep/
│   │   │   ├── gaming/
│   │   │   ├── career/
│   │   │   ├── travel/
│   │   │   └── fitness/
│   │   ├── audio/
│   │   │   ├── music/
│   │   │   ├── ambient/
│   │   │   └── transitions/
│   │   ├── images/
│   │   └── fonts/
│   └── posters/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   │
│   ├── features/
│   │   └── cinematic-hero/
│   │       ├── components/
│   │       │   ├── CinematicHero.tsx
│   │       │   ├── VideoBackground.tsx
│   │       │   ├── WorldTitle.tsx
│   │       │   ├── WorldTransition.tsx
│   │       │   ├── AudioControls.tsx
│   │       │   ├── WorldProgress.tsx
│   │       │   └── FinalReveal.tsx
│   │       ├── hooks/
│   │       │   ├── useWorldTimeline.ts
│   │       │   ├── useVideoPreload.ts
│   │       │   └── useAudioEngine.ts
│   │       ├── config/
│   │       │   ├── worlds.config.ts
│   │       │   └── animation.config.ts
│   │       ├── services/
│   │       │   ├── audioEngine.ts
│   │       │   └── videoManager.ts
│   │       ├── types/
│   │       │   └── world.types.ts
│   │       └── utils/
│   │           └── timeline.utils.ts
│   │
│   ├── components/
│   │   └── ui/
│   ├── lib/
│   └── styles/
│       └── tokens.css
│
├── scripts/
│   └── optimize-media.sh
│
├── docs/
│   ├── architecture.md
│   ├── hero-storyboard.md
│   └── media-guidelines.md
│
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

This is a target architecture, not a requirement to create dozens of empty implementation files.

Create files when they serve a clear purpose. Use `.gitkeep` for empty asset directories.

## 5. Architectural Requirements

### Modularity

Each component should have one clear responsibility.

Separate:

- UI rendering
- Animation orchestration
- Video management
- Audio management
- World configuration
- Application state

### Configuration-Driven Worlds

All World-specific metadata must be defined in `worlds.config.ts`.

Each World should have typed fields such as:

- id
- name
- tagline
- duration
- theme
- video source
- poster source
- audio source
- animation preset

Adding another World should not require rewriting the cinematic hero.

### Performance

Design the architecture to eventually support:

- Smooth 60 FPS animation where hardware permits
- Efficient media preloading
- GPU-friendly CSS transforms
- Lazy loading where appropriate
- Proper cleanup of media and animations
- Mobile performance optimization
- Reduced-motion accessibility

Do not preload every full-resolution video simultaneously.

### Maintainability

- Strict TypeScript
- Consistent naming conventions
- Reusable components
- No duplicated business logic
- No unnecessary global state
- Clear imports and module boundaries
- Proper React effect cleanup
- Avoid overengineering

### Future Full-Stack Expansion

The codebase should eventually support:

- User authentication
- User profiles
- World-specific feeds
- Communities
- Social interactions
- Content management
- Notifications
- Media uploads
- Personalized recommendations

Do not implement these features yet.

## 6. Your Current Task — Phase 1

Perform only the following tasks:

1. Inspect the current workspace and identify any existing files.
2. Initialize a Next.js App Router application if one does not exist.
3. Configure TypeScript strict mode, Tailwind CSS, and ESLint.
4. Install GSAP.
5. Establish the modular folder architecture.
6. Define a reusable `World` TypeScript interface or type.
7. Create configuration entries for the five planned Worlds, using clearly identified local asset paths that will be populated later.
8. Create a minimal, functional placeholder homepage displaying the WORLDS brand and a short description.
9. Create basic design tokens and a dark default theme.
10. Document the architecture in `docs/architecture.md`.
11. Document the planned 50-second cinematic sequence in `docs/hero-storyboard.md`.
12. Document media folder conventions and optimization recommendations in `docs/media-guidelines.md`.
13. Add a README with installation instructions, development commands, folder explanations, and future development phases.
14. Configure `.gitignore` appropriately.
15. Run linting, TypeScript validation, and the production build.
16. Fix any errors introduced during setup.

Do not download footage or music.

Do not create elaborate UI components, GSAP timelines, audio engines, or video transition logic yet.

Do not create a backend, database, authentication system, or social platform features.

Do not add unnecessary packages.

## 7. Completion Report

When finished, provide:

1. A concise summary of what was created.
2. The actual final folder structure.
3. Installed dependencies.
4. Results of lint, TypeScript, and production build checks.
5. Instructions for starting the development server.
6. Any issues or decisions requiring my attention.
7. The recommended next development step.

**Stop after Phase 1 and wait for further instructions.**

The ultimate objective is an exceptionally polished, immersive cinematic experience. However, this first phase is exclusively about establishing a maintainable, easy-to-understand foundation.

Do not rush into building the hero.
