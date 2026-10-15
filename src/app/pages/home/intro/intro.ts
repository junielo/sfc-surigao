import { afterNextRender, Component, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-intro',
  styleUrl: './intro.scss',
  templateUrl: './intro.html',
})
export class Intro {
  private readonly destroyRef = inject(DestroyRef);
  private readonly photos = viewChild.required<ElementRef<HTMLElement>>('photos');

  protected readonly inView = signal(false);

  constructor() {
    afterNextRender(() => {
      // A zero-height "line" across the middle of the viewport:
      // the callback fires when the photos cross the center of the screen.
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.inView.set(true);
            observer.disconnect(); // play once
          }
        },
        { rootMargin: '-50% 0px -50% 0px' },
      );

      observer.observe(this.photos().nativeElement);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}