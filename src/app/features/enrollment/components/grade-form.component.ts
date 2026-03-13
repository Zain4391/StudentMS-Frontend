import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EnrollmentService } from '../../../core/services/enrollment.service';
import { AuthService } from '../../../core/services/auth.service';
import { Grade } from '../../../shared/models/enums';

@Component({
  selector: 'app-grade-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './grade-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradeFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private enrollmentService = inject(EnrollmentService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  enrollmentId: number | null = null;
  loading = false;
  error: string | null = null;

  readonly grades: Grade[] = ['A', 'B', 'C', 'D', 'E', 'FAIL'];

  form: FormGroup = this.fb.group({
    grade: [null, Validators.required],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.enrollmentId = +id;
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const teacherId = this.authService.currentUser()?.id;
    if (!teacherId) {
      this.error = 'Could not identify teacher. Please log in again.';
      return;
    }

    this.loading = true;
    this.error = null;

    this.enrollmentService
      .updateGrade(this.enrollmentId!, this.form.value.grade, teacherId)
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/enrollments']);
        },
        error: () => {
          this.loading = false;
          this.error = 'Failed to update grade. Please try again.';
        },
      });
  }

  goBack(): void {
    this.router.navigate(['/enrollments']);
  }
}
