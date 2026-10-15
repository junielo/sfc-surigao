import { Component, DestroyRef, ElementRef, viewChild, signal, inject, PLATFORM_ID, afterNextRender, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  imports: [],
  selector: 'app-what-we-do',
  styleUrl: './what-we-do.scss',
  templateUrl: './what-we-do.html',
})
export class WhatWeDo {
  logoRef = viewChild<ElementRef<HTMLElement>>('logoRef');
  clpIconRef = viewChild<ElementRef<HTMLElement>>('clpIcon');
  assemblyIconRef = viewChild<ElementRef<HTMLElement>>('assemblyIcon');
  isAnimated = signal(false);
  isClpAnimated = signal(false);
  isHouseholdAnimated = signal(false);
  isAssemblyAnimated = signal(false);
  isEventsAnimated = signal(false);
  isClpTitleAnimated = signal(false);
  isHouseholdTitleAnimated = signal(false);
  isAssemblyTitleAnimated = signal(false);
  isEventsTitleAnimated = signal(false);
  platformId = inject(PLATFORM_ID);
  private host = inject<ElementRef<HTMLElement>>(ElementRef);
  private destroyRef = inject(DestroyRef);

  private initParallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const tiles = Array.from(this.host.nativeElement.querySelectorAll<HTMLElement>('.tile'));
    if (!tiles.length) {
      return;
    }

    // How far (as a fraction of the tile's height) each layer drifts across the viewport.
    // Layers lag behind the scroll. The text drifts more than the background,
    // so it lags more (moves slower) and the tile moves slightly faster than the text.
    const BG_RANGE = 0.08;
    const CONTENT_RANGE = 0.11;
    // Extra drift for the icon on top of the text block's, so it lags the most (moves slowest).
    // Capped in px so it never runs into the title below it.
    const ICON_RANGE = 0.06;
    const ICON_MAX_PX = 30;
    let ticking = false;

    const update = () => {
      ticking = false;
      const vh = window.innerHeight;

      // read pass
      const measures = tiles.map(tile => {
        const rect = tile.getBoundingClientRect();
        const content = tile.querySelector<HTMLElement>('.tile-content');
        const spare = content ? Math.max(0, (rect.height - content.offsetHeight) / 2) : 0;
        return { rect, spare };
      });

      // write pass
      tiles.forEach((tile, i) => {
        const { rect, spare } = measures[i];
        const range = vh / 2 + rect.height / 2;
        const p = Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - vh / 2) / range));
        // keep the text from being pushed outside the tile on small screens
        const contentMax = Math.min(rect.height * CONTENT_RANGE, spare);
        tile.style.setProperty('--bg-y', `${-p * rect.height * BG_RANGE}px`);
        tile.style.setProperty('--content-y', `${-p * contentMax}px`);
        const iconMax = Math.min(rect.height * ICON_RANGE, ICON_MAX_PX);
        tile.style.setProperty('--icon-y', `${-p * iconMax}px`);
      });
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    this.destroyRef.onDestroy(() => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    });

    update();
  }

  isTileAnimated(icon: string): boolean {
    return (
      (icon.includes('clp_tile.png') && this.isClpAnimated()) ||
      (icon.includes('household_tile.png') && this.isHouseholdAnimated()) ||
      (icon.includes('assembly_tile.png') && this.isAssemblyAnimated()) ||
      (icon.includes('events_tile.png') && this.isEventsAnimated())
    );
  }

  isTitleAnimated(icon: string): boolean {
    return (
      (icon.includes('clp_tile.png') && this.isClpTitleAnimated()) ||
      (icon.includes('household_tile.png') && this.isHouseholdTitleAnimated()) ||
      (icon.includes('assembly_tile.png') && this.isAssemblyTitleAnimated()) ||
      (icon.includes('events_tile.png') && this.isEventsTitleAnimated())
    );
  }

  onClpAnimationEnd() {
    this.isClpTitleAnimated.set(true);
    if (!this.isHouseholdAnimated()) {
      this.isHouseholdAnimated.set(true);
    }
  }

  onHouseholdAnimationEnd() {
    this.isHouseholdTitleAnimated.set(true);
  }

  onAssemblyAnimationEnd() {
    this.isAssemblyTitleAnimated.set(true);
    if (!this.isEventsAnimated()) {
      this.isEventsAnimated.set(true);
    }
  }

  onEventsAnimationEnd() {
    this.isEventsTitleAnimated.set(true);
  }

  tiles = [
    {
      title: 'Christian Life Program',
      description: 'A 13-session course, usually weekly, with a teaching, group discussion, and fellowship, about 2.5 hours each.',
      icon: 'images/home/what-we-do/church-tiles/clp_tile.png',
      src: 'images/home/what-we-do/grid-images/img1.jpg',
      tint: '#0B003B',
      opacity: 0.8,
      shadowColor: '#6762FF',
    },
    {
      title: 'Households',
      description: "A small group of 5 to 7 people who meet weekly in members' homes for prayer, sharing, and fellowship.",
      icon: 'images/home/what-we-do/church-tiles/household_tile.png',
      src: 'images/home/what-we-do/grid-images/img2.jpg',
      tint: '#011908',
      opacity: 0.8,
      shadowColor: '#3CAD43',
    },
    {
      title: 'Prayer Assemblies & Teachings',
      description: 'A monthly gathering of the whole chapter for worship, Scripture, and sharing, plus teachings on topics like courtship, time management, and the Theology of the Body.',
      icon: 'images/home/what-we-do/church-tiles/assembly_tile.png',
      src: 'images/home/what-we-do/grid-images/img3.jpg',
      tint: '#120003',
      opacity: 0.8,
      shadowColor: '#D72626',
    },
    {
      title: 'Events & Mission',
      description: 'Large gatherings like the 30th anniversary, with a praise parade, a talent show, a TikTok dance contest, sports tournaments, and an acoustic concert, plus service.',
      icon: 'images/home/what-we-do/church-tiles/events_tile.png',
      src: 'images/home/what-we-do/grid-images/img4.jpg',
      tint: '#050402',
      opacity: 0.8,
      shadowColor: '#9A3CE2',
    },
  ];

  constructor() {
    effect(() => {
      if (this.isClpAnimated() && !this.isClpTitleAnimated()) {
        const timer = setTimeout(() => {
          if (!this.isClpTitleAnimated()) {
            this.isClpTitleAnimated.set(true);
          }
        }, 800);
        return () => clearTimeout(timer);
      }
      return undefined;
    });

    effect(() => {
      if (this.isHouseholdAnimated() && !this.isHouseholdTitleAnimated()) {
        const timer = setTimeout(() => {
          if (!this.isHouseholdTitleAnimated()) {
            this.isHouseholdTitleAnimated.set(true);
          }
        }, 800);
        return () => clearTimeout(timer);
      }
      return undefined;
    });

    effect(() => {
      if (this.isClpAnimated() && !this.isHouseholdAnimated()) {
        const timer = setTimeout(() => {
          if (!this.isHouseholdAnimated()) {
            this.isHouseholdAnimated.set(true);
          }
        }, 800);
        return () => clearTimeout(timer);
      }
      return undefined;
    });

    effect(() => {
      if (this.isAssemblyAnimated() && !this.isAssemblyTitleAnimated()) {
        const timer = setTimeout(() => {
          if (!this.isAssemblyTitleAnimated()) {
            this.isAssemblyTitleAnimated.set(true);
          }
        }, 800);
        return () => clearTimeout(timer);
      }
      return undefined;
    });

    effect(() => {
      if (this.isEventsAnimated() && !this.isEventsTitleAnimated()) {
        const timer = setTimeout(() => {
          if (!this.isEventsTitleAnimated()) {
            this.isEventsTitleAnimated.set(true);
          }
        }, 800);
        return () => clearTimeout(timer);
      }
      return undefined;
    });

    effect(() => {
      if (this.isAssemblyAnimated() && !this.isEventsAnimated()) {
        const timer = setTimeout(() => {
          if (!this.isEventsAnimated()) {
            this.isEventsAnimated.set(true);
          }
        }, 800);
        return () => clearTimeout(timer);
      }
      return undefined;
    });

    if (isPlatformBrowser(this.platformId)) {
      afterNextRender(() => this.initParallax());
    }

    if (isPlatformBrowser(this.platformId)) {
      afterNextRender(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
          this.isAnimated.set(true);
          this.isClpAnimated.set(true);
          this.isHouseholdAnimated.set(true);
          this.isAssemblyAnimated.set(true);
          this.isEventsAnimated.set(true);
          this.isClpTitleAnimated.set(true);
          this.isHouseholdTitleAnimated.set(true);
          this.isAssemblyTitleAnimated.set(true);
          this.isEventsTitleAnimated.set(true);
          return;
        }

        const el = this.logoRef()?.nativeElement;
        if (el) {
          const observer = new IntersectionObserver(
            (entries, obs) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  this.isAnimated.set(true);
                  obs.unobserve(entry.target);
                }
              });
            },
            {
              root: null,
              rootMargin: '-30% 0px -30% 0px',
              threshold: 0.1,
            }
          );

          observer.observe(el);
        }

        const clpEl = this.clpIconRef()?.nativeElement;
        if (clpEl) {
          const clpObserver = new IntersectionObserver(
            (entries, obs) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  this.isClpAnimated.set(true);
                  obs.unobserve(entry.target);
                }
              });
            },
            {
              root: null,
              rootMargin: '-30% 0px -50% 0px',
              threshold: 0.1,
            }
          );

          clpObserver.observe(clpEl);
        }

        const assemblyEl = this.assemblyIconRef()?.nativeElement;
        if (assemblyEl) {
          const assemblyObserver = new IntersectionObserver(
            (entries, obs) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  this.isAssemblyAnimated.set(true);
                  obs.unobserve(entry.target);
                }
              });
            },
            {
              root: null,
              rootMargin: '-30% 0px -50% 0px',
              threshold: 0.1,
            }
          );

          assemblyObserver.observe(assemblyEl);
        }
      });
    }
  }
}