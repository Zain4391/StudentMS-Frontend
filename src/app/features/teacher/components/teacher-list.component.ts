import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { TeacherService } from '../../../core/services/teacher.service';
import { AuthService } from '../../../core/services/auth.service';
import { TeacherResponse } from '../../../shared/models/teacher.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-teachers-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './teacher-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeachersListComponent implements OnInit {
  private readonly teacherService = inject(TeacherService);
  private readonly authService = inject(AuthService);

  readonly teachers = signal<TeacherResponse[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly currentPage = signal(0);
  readonly totalPages = signal(0);
  readonly totalElements = signal(0);

  readonly isAdmin = computed(() => this.authService.isAdmin());

  ngOnInit(): void {
    this.loadTeachers(0);
  }

  loadTeachers(page: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.teacherService.getAll(page).subscribe({
      next: (response) => {
        this.teachers.set(response.content);
        this.currentPage.set(response.number);
        this.totalPages.set(response.totalPages);
        this.totalElements.set(response.totalElements);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.message ?? 'Failed to load teachers.');
        this.loading.set(false);
      },
    });
  }

  goToPage(page: number): void {
    this.loadTeachers(page);
  }

  deleteTeacher(id: number): void {
    if (!confirm('Delete this teacher?')) return;
    this.teacherService.delete(id).subscribe({
      next: () => this.loadTeachers(this.currentPage()),
      error: (err) => this.error.set(err.error?.message ?? 'Delete failed.'),
    });
  }
}
