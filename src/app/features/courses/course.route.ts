import { Routes } from '@angular/router';

export const COURSE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/course-list.component').then((m) => m.CoursesListComponent),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./components/course-form.component').then((m) => m.CourseFormComponent),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./components/course-form.component').then((m) => m.CourseFormComponent),
  },
];
