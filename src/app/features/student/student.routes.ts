import { Routes } from '@angular/router';

export const STUDENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/student-list.component').then(m => m.StudentsListComponent)
  }
];