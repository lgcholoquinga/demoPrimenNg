import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'datepicker',
    loadComponent: () => import('./pages/datepicker/datepicker-page'),
  },
  {
    path: 'input',
    loadComponent: () => import('./pages/input/input-page'),
  },
  {
    path: 'select',
    loadComponent: () => import('./pages/select/select-page'),
  },
  {
    path: 'radio-button',
    loadComponent: () => import('./pages/radio-button/radio-button-page'),
  },
  {
    path: 'dialog2',
    loadComponent: () => import('./pages/pbo-dialog-page/pbo-dialog-page'),
  },
  {
    path: '',
    redirectTo: 'dialog',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'dialog',
  },
];
