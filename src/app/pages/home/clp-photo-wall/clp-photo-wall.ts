import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-clp-photo-wall',
  styleUrl: './clp-photo-wall.scss',
  templateUrl: './clp-photo-wall.html',
})
export class ClpPhotoWall implements OnInit {
  photos: string[] = [
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
   * Each half of the track must be wider than the viewport, otherwise
   * empty space shows up at the end of the animation. 11 images are only
   * ~77vw wide, so one half = 2 copies of the set (~154vw).
   */
  private readonly copiesPerHalf = 2;

  /** Total rendered images: [half A][half B], where both halves are identical. */
  marqueePhotos: string[] = [];

  /** Used in the template to mark the second half as decorative (a11y). */
  halfLength = 0;

  ngOnInit() {
    this.shufflePhotos();

    const half = Array.from({ length: this.copiesPerHalf }, () => this.photos).flat();
    this.halfLength = half.length;
    this.marqueePhotos = [...half, ...half];
  }

  private shufflePhotos() {
    for (let i = this.photos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.photos[i], this.photos[j]] = [this.photos[j], this.photos[i]];
    }
  }
}