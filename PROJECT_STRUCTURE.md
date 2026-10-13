# Project Structure

- **Angular Version:** v22.2.0 (Standalone components used by default)
- **Routes File:** `src/app/app.routes.ts`
- **Global Stylesheet:** `src/styles.css`
- **Tailwind Setup:** Configured using Tailwind CSS v4 (`tailwindcss` and `@tailwindcss/postcss` packages) imported via `@import "tailwindcss";` in `src/styles.css`.

## Folder Tree of `src/app` (3 Levels Deep)
```text
src/app/
├── app.config.server.ts
├── app.config.ts
├── app.html
├── app.routes.server.ts
├── app.routes.ts
├── app.scss
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
```

## Existing Components and Pages
- **Components:** Navbar, Footer, Hero, Intro, EventsCarousel, WhatWeDo, ClpPhotoWall
- **Pages:** Home, About, Activities, Gallery, Contact
