import { Routes } from '@angular/router';

export const TEACHER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/teacher-list.component').then(m => m.TeachersListComponent)
  }
];