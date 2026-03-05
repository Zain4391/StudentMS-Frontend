import { Routes } from '@angular/router';

export const COURSE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/course-list.component').then(m => m.CoursesListComponent)
  }
];