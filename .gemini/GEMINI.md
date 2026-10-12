You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Do NOT set `changeDetection: ChangeDetectionStrategy.OnPush` explicitly. `OnPush` is the default in Angular v22+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `model()` for two-way bound properties with `[(prop)]` syntax instead of pairing `input()` with `output()`
- Use `computed()` for derived state
- Use `linkedSignal()` for state derived from multiple reactive sources that must stay synchronized
- Prefer inline templates for small components
- Prefer Signal Forms (`@angular/forms/signals`) for new forms. They are stable in Angular v22+ and provide signal-based state, type-safe field access, and schema-based validation
- When not using Signal Forms, prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- Do NOT import `CommonModule`, import only the directives and pipes the template uses, such as `AsyncPipe` or `DatePipe`
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Prefer the `@Service` decorator over `@Injectable({providedIn: 'root'})` for new singleton services (Angular v22+)
- Use the `inject()` function instead of constructor injection

## Project Context

- Website for CFC Singles for Christ (SFC) Surigao del Norte, a Catholic community for young adults. Audience: first-time visitors, mostly on mobile, who know nothing about SFC.
- Tone: warm, simple, faith-filled, youthful. Not corporate or busy.
- Phase 1 is a static site. Phase 2 (later) adds events calendar, blog, registration, dynamic gallery, admin updates. Keep content in typed files so Phase 2 can swap in an API or CMS.
- Current scope: the Home page only. Build only what exists in the Figma design. Do not add sections, pages, or features that are not in it.
- Navigation: Home, About, Gallery, Contact. The footer stays empty for now. English only.
- Never invent facts about the organization (fees, requirements, schedules, contact details). Use placeholders and mark them clearly.

## Project Structure

- `src/app/components/`: `navbar`, `footer` (footer is an empty placeholder for now).
- `src/app/pages/`: `home`, `about`, `activities`, `gallery`, `contact`. Only `home` is being built. The others are empty placeholders: do not add content to them unless asked.
- `src/app/pages/home/` holds the Home sections as separate small components: `hero`, `intro`, `what-we-do`, `clp-photo-wall`, `events-carousel`. The `home` page only assembles them.
- The `activities` page exists but is not in the nav (nav is Home, About, Gallery, Contact).
- Routes live in `app.routes.ts` and are lazy-loaded.
- Content goes in typed TS or JSON files (for example in `src/app/data/`), not in templates.
- Do not create new pages or components that are not listed here without asking first.
- Build order for Home: navbar, hero, intro, what-we-do, clp-photo-wall, events-carousel.

## Styling (Tailwind CSS v4)

- Tailwind v4 is installed through `@tailwindcss/postcss` and `.postcssrc.json`. The global stylesheet is `src/styles.scss` and starts with `@use "tailwindcss";`. Keep the `@theme` tokens in that file. Put styles for one component in that component's own stylesheet, not the global file.
- Do NOT create `tailwind.config.js`. Do NOT install or configure `autoprefixer`. Do NOT use the v3 directives `@tailwind base/components/utilities`.
- Put design tokens in an `@theme` block in the global stylesheet. Brand colors: navy `#162045`, steel blue `#5F87A6`, beige `#E6D8C9`. Use steel blue only for icons, borders, dividers, and large headings, never for small text.
- Avoid `@apply` in component stylesheets (Tailwind v4 needs `@reference` there). Prefer utility classes in templates or plain CSS.
- Use utility classes in templates for layout, spacing, and responsive behavior. Use custom CSS only for effects utilities cannot express (blurred tinted tiles, glowing icons, tilted photo stack, photo-wall scroll).
- Build mobile-first. The Figma file only has a desktop frame, so design the mobile layout to match its style: the 2x2 tile grid becomes one column on mobile.

## Motion and Transitions

- Do NOT use `@angular/animations`. Use `animate.enter` and `animate.leave` with CSS animations for elements entering or leaving the DOM.
- Use plain CSS transitions and keyframes for hover and tap states, and the Angular Router's `withViewTransitions()` for page transitions.
- For scroll reveals, use `IntersectionObserver` or CSS scroll-driven animations.
- Animate only `transform` and `opacity` where possible.
- ALWAYS respect `prefers-reduced-motion`: disable or simplify every animation for users who prefer reduced motion.
- Do not add an animation library (GSAP, AOS, and so on) unless asked.

## Content and Images

- Key information (event title, date, time, venue) must be real HTML text, not only inside an image.
- Never put text inside generated or exported images. Titles and descriptions are HTML.
- Keep content (cards, events, gallery items) in typed TS or JSON files, not hard-coded in templates.
- Every image needs meaningful `alt` text, explicit dimensions, and lazy loading except the hero. Prefer WebP.
- The hero wordmark ("CFC SINGLES FOR CHRIST") is the page's `<h1>` and must be live text or SVG.
- Text over photos needs a solid or blurred backdrop so it meets WCAG AA contrast.

## SEO

- Use prerendering (SSG) or SSR. Set a unique title and meta description per page, plus Open Graph tags for Facebook link previews.

## How to Work With Me

- Do one component or one task per request. Do not rewrite unrelated files.
- Ask before installing any new package.
- After changes, run `ng build` and fix errors before reporting that the work is done.
- If an Angular or Tailwind API is unfamiliar or you are unsure it exists in the current version, say so instead of guessing.
- Briefly explain what you changed and why, so the developer can learn from it.
