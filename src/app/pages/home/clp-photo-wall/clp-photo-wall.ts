import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MarqueeRow {
  /** Photos rendered in the track: [half A][half B], both halves identical. */
  photos: string[];
  /** Number of photos in one half (used to mark the 2nd half as decorative). */
  halfLength: number;
  direction: 'left' | 'right';
}

@Component({
  imports: [CommonModule],
  selector: 'app-clp-photo-wall',
  styleUrl: './clp-photo-wall.scss',
  templateUrl: './clp-photo-wall.html',
})
export class ClpPhotoWall implements OnInit {
  private readonly photos: string[] = [
    '/images/home/photo-wall/gallery/img1.png',
    '/images/home/photo-wall/gallery/img2.png',
    '/images/home/photo-wall/gallery/img3.png',
    '/images/home/photo-wall/gallery/img4.png',
    '/images/home/photo-wall/gallery/img5.png',
    '/images/home/photo-wall/gallery/img6.png',
    '/images/home/photo-wall/gallery/img7.png',
    '/images/home/photo-wall/gallery/img8.png',
    '/images/home/photo-wall/gallery/img9.png',
    '/images/home/photo-wall/gallery/img10.png',
    '/images/home/photo-wall/gallery/img11.png',
  ];

  /**
   * Each half of a track must be wider than the viewport, otherwise empty
   * space shows up during the animation. 11 images are ~77vw wide,
   * so one half = 2 copies of the set (~154vw).
   */
  private readonly copiesPerHalf = 2;

  rows: MarqueeRow[] = [];

  ngOnInit() {
    this.rows = [this.buildRow('left'), this.buildRow('right'), this.buildRow('left')];
  }

  private buildRow(direction: 'left' | 'right'): MarqueeRow {
    // Each row gets its own shuffle so the rows don't look identical.
    const shuffled = this.shuffle(this.photos);
    const half = Array.from({ length: this.copiesPerHalf }, () => shuffled).flat();

    return {
      photos: [...half, ...half],
      halfLength: half.length,
      direction,
    };
  }

  private shuffle(source: string[]): string[] {
    const arr = [...source];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}