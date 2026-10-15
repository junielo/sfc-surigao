import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  imports: [],
  selector: 'app-hero',
  styleUrl: './hero.scss',
  templateUrl: './hero.html',
})
export class Hero implements AfterViewInit, OnDestroy {
  heroSrc = 'images/home/img_hero.png';

  @ViewChild('heroWrap', { static: true }) heroWrap!: ElementRef<HTMLElement>;
  @ViewChild('heroImg', { static: true }) heroImg!: ElementRef<HTMLImageElement>;

  private readonly SPEED = 0.08; // raise to ~0.12 for a stronger effect
  private readonly SCALE = 1.08; // must match the scale in hero.html
  private ticking = false;

  constructor(
    private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private onScroll = () => {
    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      this.update();
      this.ticking = false;
    });
  };

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Run outside Angular so scrolling doesn't trigger change detection
    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, { passive: true });
    });
    this.update();
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.removeEventListener('scroll', this.onScroll);
  }

  private update(): void {
    const rect = this.heroWrap.nativeElement.getBoundingClientRect();
    if (rect.bottom < 0) return; // hero is off-screen

    // Never shift more than the spare pixels created by the scale-up
    const maxShift = rect.height * ((this.SCALE - 1) / 2);
    const shift = Math.min(Math.max(-rect.top * this.SPEED, 0), maxShift);

    this.heroImg.nativeElement.style.transform =
      `translate3d(0, ${shift}px, 0) scale(${this.SCALE})`;
  }
}