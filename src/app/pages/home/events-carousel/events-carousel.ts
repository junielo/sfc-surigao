import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';

export interface ActivityItem {
  id: number;
  title: string;
  /** ISO dates (yyyy-mm-dd) */
  startDate: string;
  endDate: string;
  /** Any size / aspect ratio: it is always cropped to the slide frame */
  image: string;
}

@Component({
  imports: [],
  selector: 'app-events-carousel',
  styleUrl: './events-carousel.scss',
  templateUrl: './events-carousel.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(window:resize)': 'updateBackground()' },
})
export class EventsCarousel implements AfterViewInit {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  // TODO: replace with your real data / service
  readonly activities = signal<ActivityItem[]>([
    { id: 1, title: 'Church Anniversary', startDate: '2026-10-04', endDate: '2026-11-22', image: 'images/home/events/img_latest.png' },
    { id: 2, title: 'Youth Camp', startDate: '2026-11-28', endDate: '2026-11-30', image: 'images/home/events/img_old.png' },
  ]);

  readonly activeIndex = signal(0);
  readonly active = computed(() => this.activities()[this.activeIndex()]);

  rangeLabel(item: ActivityItem): string {
    return this.formatRange(item.startDate, item.endDate);
  }

  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');
  private rafId = 0;
  private animId = 0;
  /** True while our own scroll animation runs, so mid-scroll positions don't change the active item */
  private programmatic = false;

  /** Must match the transform/opacity transition in the SCSS (650ms, same curve) */
  private static readonly DURATION_MS = 650;
  private readonly easeFn = EventsCarousel.cubicBezier(0.22, 0.8, 0.26, 1);

  ngAfterViewInit(): void {
    this.updateBackground();
  }

  onScroll(): void {
    this.updateBackground();
    if (this.programmatic) return;
    cancelAnimationFrame(this.rafId);
    this.rafId = requestAnimationFrame(() => this.updateActive());
  }

  /**
   * Scrolls with our own animation (same duration + easing as the CSS
   * transition) instead of the browser's smooth scroll, so the scroll and the
   * scale/shift always start and finish together. Scroll-snap is switched off
   * while it runs and restored at the end (the target is the snap position,
   * so nothing moves when it comes back on).
   */
  goTo(index: number): void {
    const trackEl = this.track().nativeElement;
    const el = this.slideElements()[index];
    if (!el) return;

    this.activeIndex.set(index); // scale/shift start immediately

    const max = trackEl.scrollWidth - trackEl.clientWidth;
    const target = Math.min(max, Math.max(0, el.offsetLeft + el.offsetWidth / 2 - trackEl.clientWidth / 2));
    const start = trackEl.scrollLeft;

    this.stopAnimation();
    if (Math.abs(target - start) < 1) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduced ? 0 : EventsCarousel.DURATION_MS;

    this.programmatic = true;
    trackEl.style.scrollSnapType = 'none';
    const t0 = performance.now();

    const step = (now: number) => {
      const p = duration === 0 ? 1 : Math.min(1, (now - t0) / duration);
      trackEl.scrollLeft = start + (target - start) * this.easeFn(p);
      this.updateBackground();
      if (p < 1) {
        this.animId = requestAnimationFrame(step);
      } else {
        this.stopAnimation();
      }
    };
    this.animId = requestAnimationFrame(step);
  }

  /**
   * Background layers travel horizontally exactly like the slides do (1:1 with
   * the track's scroll position) and cross-fade by distance from the center,
   * so they follow the slider's direction on every frame. They are never scaled
   * by the transition; the enlargement is a fixed scale in the SCSS.
   * Written straight to the DOM (no change detection) because it runs every frame.
   */
  updateBackground(): void {
    const trackEl = this.track().nativeElement;
    const slides = this.slideElements();
    const layers = this.host.nativeElement.querySelectorAll<HTMLElement>('.bg__img');
    if (!slides.length) return;

    const viewCenter = trackEl.scrollLeft + trackEl.clientWidth / 2;
    const pitch = slides.length > 1
      ? slides[1].offsetLeft - slides[0].offsetLeft
      : slides[0].offsetWidth;

    slides.forEach((slide, i) => {
      const layer = layers[i];
      if (!layer) return;
      const offset = slide.offsetLeft + slide.offsetWidth / 2 - viewCenter; // same shift the slide has on screen
      layer.style.transform = `translate3d(${offset}px, 0, 0) scale(1.8)`;
      layer.style.opacity = String(Math.max(0, 1 - Math.abs(offset) / pitch));
    });
  }

  /** Wheel / touch: let the user take over immediately */
  onUserScroll(): void {
    if (this.programmatic) this.stopAnimation();
  }

  private stopAnimation(): void {
    cancelAnimationFrame(this.animId);
    this.programmatic = false;
    this.track().nativeElement.style.scrollSnapType = '';
  }

  /** Same curve as CSS cubic-bezier(x1, y1, x2, y2) */
  private static cubicBezier(x1: number, y1: number, x2: number, y2: number): (x: number) => number {
    const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
    const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
    const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
    const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
    return (x: number) => {
      let lo = 0, hi = 1, t = x;
      for (let i = 0; i < 24; i++) {
        const v = sampleX(t);
        if (Math.abs(v - x) < 1e-5) break;
        if (v < x) lo = t; else hi = t;
        t = (lo + hi) / 2;
      }
      return sampleY(t);
    };
  }

  next(): void { this.goTo(Math.min(this.activeIndex() + 1, this.activities().length - 1)); }
  prev(): void { this.goTo(Math.max(this.activeIndex() - 1, 0)); }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') { event.preventDefault(); this.next(); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); this.prev(); }
  }

  private slideElements(): HTMLElement[] {
    return Array.from(this.track().nativeElement.querySelectorAll<HTMLElement>('.slide'));
  }

  /**
   * Active slide = the one whose center is closest to the track's center.
   * Uses layout offsets (not getBoundingClientRect) so the scale transforms
   * don't affect the result.
   */
  private updateActive(): void {
    const trackEl = this.track().nativeElement;
    const center = trackEl.scrollLeft + trackEl.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    this.slideElements().forEach((el, i) => {
      const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center);
      if (dist < bestDist) { bestDist = dist; best = i; }
    });
    if (best !== this.activeIndex()) this.activeIndex.set(best);
  }

  /** "Oct 04 - Nov 22, 2026" (adds years on both ends if they differ) */
  private formatRange(start: string, end: string): string {
    const s = new Date(`${start}T00:00:00`);
    const e = new Date(`${end}T00:00:00`);
    const md = (d: Date) =>
      `${d.toLocaleString('en-US', { month: 'short' })} ${String(d.getDate()).padStart(2, '0')}`;
    if (start === end) return `${md(s)}, ${s.getFullYear()}`;
    if (s.getFullYear() === e.getFullYear()) return `${md(s)} - ${md(e)}, ${e.getFullYear()}`;
    return `${md(s)}, ${s.getFullYear()} - ${md(e)}, ${e.getFullYear()}`;
  }
}