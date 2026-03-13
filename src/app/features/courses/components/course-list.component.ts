import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CourseService } from '../../../core/services/course.service';
import { AuthService } from '../../../core/services/auth.service';
import { CourseResponse } from '../../../shared/models/course.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './course-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesListComponent implements OnInit {
  private readonly courseService = inject(CourseService);
  private readonly authService = inject(AuthService);

  readonly courses = signal<CourseResponse[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly currentPage = signal(0);
  readonly totalPages = signal(0);
  readonly totalElements = signal(0);

  readonly isAdminOrTeacher = computed(
    () => this.authService.isAdmin() || this.authService.isTeacher(),
  );

  ngOnInit(): void {
    this.loadCourses(0);
  }

  loadCourses(page: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.courseService.getAll(page).subscribe({
      next: (response) => {
        this.courses.set(response.content);
        this.currentPage.set(response.number);
        this.totalPages.set(response.totalPages);
        this.totalElements.set(response.totalElements);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.message ?? 'Failed to load courses.');
        this.loading.set(false);
      },
    });
  }

  goToPage(page: number): void {
    this.loadCourses(page);
  }

  deleteCourse(id: number): void {
    if (!confirm('Delete this course?')) return;
    this.courseService.delete(id).subscribe({
      next: () => this.loadCourses(this.currentPage()),
      error: (err) => this.error.set(err.error?.message ?? 'Delete failed.'),
    });
  }
}
