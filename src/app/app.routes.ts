import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'select',
    loadComponent: () => import('./pages/select/select-page'),
  },
  {
    path: 'radio-button',
    loadComponent: () => import('./pages/radio-button/radio-button-page'),
  },
  {
    path: '',
    redirectTo: 'select',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'select',
  },
];
