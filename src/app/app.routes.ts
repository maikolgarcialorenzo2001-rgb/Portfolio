import type { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component') },
  { path: 'projects/study', loadComponent: () => import('./pages/study-projects/study-projects.component') },
];
