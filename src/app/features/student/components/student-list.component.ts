import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { StudentService } from '../../../core/services/student.service';
import { AuthService } from '../../../core/services/auth.service';
import { StudentResponse } from '../../../shared/models/student.model';

@Component({
  selector: 'app-students-list',
  standalone: true,
  templateUrl: './student-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsListComponent implements OnInit {
  private readonly studentService = inject(StudentService);
  private readonly authService = inject(AuthService);

  readonly students = signal<StudentResponse[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly currentPage = signal(0);
  readonly totalPages = signal(0);
  readonly totalElements = signal(0);

  readonly isAdmin = computed(() => this.authService.isAdmin());

  // runs after Angular has initialized the component's inputs.
  ngOnInit(): void {
    this.loadStudents(0);
  }

  loadStudents(page: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.studentService.getAll(page).subscribe({
      next: (response) => {
        this.students.set(response.content);
        this.currentPage.set(response.number);
        this.totalPages.set(response.totalPages);
        this.totalElements.set(response.totalElements);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.message ?? 'Failed to load students');
        this.loading.set(false);
      },
    });
  }

  goToPage(page: number): void {
    this.loadStudents(page);
  }

  deleteStudent(id: number): void {
    if (!confirm('Delete Student?')) {
      return;
    }
    this.studentService.delete(id).subscribe({
      next: () => this.loadStudents(this.currentPage()),
      error: (err) => this.error.set(err.error?.message ?? 'Delete failed.'),
    });
  }
}
