import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EnrollmentService } from '../../../core/services/enrollment.service';
import { AuthService } from '../../../core/services/auth.service';
import { EnrollmentResponse } from '../../../shared/models/enrollment.model';

@Component({
  selector: 'app-enrollments-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './enrollment-list.component.html',
})
export class EnrollmentsListComponent implements OnInit {
  private readonly enrollmentService = inject(EnrollmentService);
  private readonly authService = inject(AuthService);

  readonly enrollments = signal<EnrollmentResponse[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly currentPage = signal(0);
  readonly totalPages = signal(0);
  readonly totalElements = signal(0);

  readonly isAdmin = computed(() => this.authService.isAdmin());
  readonly isTeacher = computed(() => this.authService.isTeacher());

  ngOnInit(): void {
    this.loadEnrollments(0);
  }

  loadEnrollments(page: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.enrollmentService.getAll(page).subscribe({
      next: (response) => {
        this.enrollments.set(response.content);
        this.currentPage.set(response.number);
        this.totalPages.set(response.totalPages);
        this.totalElements.set(response.totalElements);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.message ?? 'Failed to load enrollments.');
        this.loading.set(false);
      },
    });
  }

  goToPage(page: number): void {
    this.loadEnrollments(page);
  }

  deleteEnrollment(id: number): void {
    if (!confirm('Delete this enrollment?')) return;
    this.enrollmentService.delete(id).subscribe({
      next: () => this.loadEnrollments(this.currentPage()),
      error: (err) => this.error.set(err.error?.message ?? 'Delete failed.'),
    });
  }
}
