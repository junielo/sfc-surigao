# Project Structure

- **Angular Version:** v22.2.0 (Standalone components used by default)
- **Routes File:** `src/app/app.routes.ts`
- **Global Stylesheet:** `src/styles.css`
- **Tailwind Setup:** Configured using Tailwind CSS v4 (`tailwindcss` and `@tailwindcss/postcss` packages) imported via `@import "tailwindcss";` in `src/styles.css`.

## Folder Tree of `src/app`
```text
src/app/
├── app.config.server.ts
├── app.config.ts
├── app.html
├── app.routes.server.ts
├── app.routes.ts
├── app.spec.ts
├── app.ts
├── components/
│   ├── footer/
│   └── navbar/
└── pages/
    ├── about/
    ├── activities/
    ├── contact/
    ├── gallery/
    └── home/
        ├── clp-photo-wall/
        ├── events-carousel/
        ├── hero/
        ├── intro/
        └── what-we-do/
```

## Existing Components and Pages
- **Shared components** (`src/app/components/`): Navbar, Footer (empty placeholder)
- **Home sections** (`src/app/pages/home/`): Hero, Intro, WhatWeDo, ClpPhotoWall, EventsCarousel
- **Pages** (`src/app/pages/`): Home, About, Activities, Gallery, Contact (only Home has content; the others are empty placeholders)