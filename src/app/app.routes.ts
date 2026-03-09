import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: "auth",
        loadChildren: () => import("./features/auth/auth.route").then(m => m.AUTH_ROUTES)
    },
    {
        path: "",
        loadComponent: () => import("./core/layout/main-layout.component").then(m => m.MainLayoutComponent),
        canActivate: [authGuard],
        children: [
            {
                path: "dashboard",
                loadComponent: () => import("./features/dashboard/components/dashboard.component").then(m => m.DashboardComponent)
            },
            {
                path: "students",
                loadChildren: () => import("./features/student/student.routes").then(m => m.STUDENT_ROUTES)
            },
            {
                path: "teachers",
                loadChildren: () => import("./features/teacher/teacher.routes").then(m => m.TEACHER_ROUTES)
            },
            {
                path: "courses",
                loadChildren: () => import("./features/courses/course.route").then(m => m.COURSE_ROUTES)
            },
            {
                path: "enrollments",
                loadChildren: () => import("./features/enrollment/enrollment.route").then(m => m.ENROLLMENT_ROUTES)
            },
            {
                path: "",
                redirectTo: "dashboard",
                pathMatch: "full"
            }
        ]
    },
    {
        path: "**", redirectTo: "dashboard"
    }
];
