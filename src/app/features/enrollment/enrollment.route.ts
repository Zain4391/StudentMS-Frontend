import { Routes } from '@angular/router';

export const ENROLLMENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/enrollment-list.component').then((m) => m.EnrollmentsListComponent),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./components/enrollment-form.component').then((m) => m.EnrollmentFormComponent),
  },
  {
    path: ':id/grade',
    loadComponent: () =>
      import('./components/grade-form.component').then((m) => m.GradeFormComponent),
  },
];
