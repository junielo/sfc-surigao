import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-what-we-do',
  styleUrl: './what-we-do.scss',
  templateUrl: './what-we-do.html',
})
export class WhatWeDo {
  tiles = [
    {
      title: 'Christian Life Program',
      description: 'A 13-session course, usually weekly, with a teaching, group discussion, and fellowship, about 2.5 hours each.',
      icon: '/images/home/what-we-do/church-tiles/clp_tile.png',
      src: '/images/home/what-we-do/grid-images/img1.jpg',
      tint: '#0B003B',
      opacity: 0.8,
      shadowColor: '#6762FF',
    },
    {
      title: 'Households',
      description: "A small group of 5 to 7 people who meet weekly in members' homes for prayer, sharing, and fellowship.",
      icon: '/images/home/what-we-do/church-tiles/household_tile.png',
      src: '/images/home/what-we-do/grid-images/img2.jpg',
      tint: '#011908',
      opacity: 0.8,
      shadowColor: '#3CAD43',
    },
    {
      title: 'Prayer Assemblies & Teachings',
      description: 'A monthly gathering of the whole chapter for worship, Scripture, and sharing, plus teachings on topics like courtship, time management, and the Theology of the Body.',
      icon: '/images/home/what-we-do/church-tiles/assembly_tile.png',
      src: '/images/home/what-we-do/grid-images/img3.jpg',
      tint: '#120003',
      opacity: 0.8,
      shadowColor: '#D72626',
    },
    {
      title: 'Events & Mission',
      description: 'Large gatherings like the 30th anniversary, with a praise parade, a talent show, a TikTok dance contest, sports tournaments, and an acoustic concert, plus service.',
      icon: '/images/home/what-we-do/church-tiles/events_tile.png',
      src: '/images/home/what-we-do/grid-images/img4.jpg',
      tint: '#050402',
      opacity: 0.8,
      shadowColor: '#9A3CE2',
    },
  ];
}
