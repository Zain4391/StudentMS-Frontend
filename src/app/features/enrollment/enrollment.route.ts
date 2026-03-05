import { Routes } from '@angular/router';

export const ENROLLMENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/enrollment-list.component').then(m => m.EnrollmentsListComponent)
  }
];