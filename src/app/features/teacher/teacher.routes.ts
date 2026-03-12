import { Routes } from '@angular/router';

export const TEACHER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/teacher-list.component').then((m) => m.TeachersListComponent),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./components/teacher-form.component').then((m) => m.TeacherFormComponent),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./components/teacher-form.component').then((m) => m.TeacherFormComponent),
  },
];
