import { Routes } from '@angular/router';

export const STUDENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/student-list.component').then((m) => m.StudentsListComponent),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./components/student-form.component').then((m) => m.StudentFormComponent),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./components/student-form.component').then((m) => m.StudentFormComponent),
  },
];
