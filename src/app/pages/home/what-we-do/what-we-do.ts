import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-what-we-do',
  styleUrl: './what-we-do.scss',
  templateUrl: './what-we-do.html',
})
export class WhatWeDo {
  tiles = [
    { src: '/images/home/what-we-do/grid-images/img1.jpg', alt: 'Speaker facing the crowd', tint: '#0B003B', opacity: 0.75 },
    { src: '/images/home/what-we-do/grid-images/img2.jpg', alt: 'Speaker with microphone',  tint: '#011908', opacity: 0.75 },
    { src: '/images/home/what-we-do/grid-images/img3.jpg', alt: 'Quote card',               tint: '#120003', opacity: 0.6 },
    { src: '/images/home/what-we-do/grid-images/img4.jpg', alt: 'Speaker at the podium',    tint: '#050402', opacity: 0.6 },
  ];
}