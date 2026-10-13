import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
  { path: 'about', loadComponent: () => import('./pages/about/about').then(m => m.About) },
  { path: 'activities', loadComponent: () => import('./pages/activities/activities').then(m => m.Activities) },
  { path: 'gallery', loadComponent: () => import('./pages/gallery/gallery').then(m => m.Gallery) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact').then(m => m.Contact) },
];
