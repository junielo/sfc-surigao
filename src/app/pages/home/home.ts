import { Component } from '@angular/core';
import { Hero } from './hero/hero';
import { Intro } from './intro/intro';
import { EventsCarousel } from './events-carousel/events-carousel';
import { WhatWeDo } from './what-we-do/what-we-do';
import { ClpPhotoWall } from './clp-photo-wall/clp-photo-wall';

@Component({
  imports: [Hero, Intro, EventsCarousel, WhatWeDo, ClpPhotoWall],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {}
