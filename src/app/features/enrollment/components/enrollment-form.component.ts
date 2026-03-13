import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EnrollmentService } from '../../../core/services/enrollment.service';
import { StudentService } from '../../../core/services/student.service';
import { CourseService } from '../../../core/services/course.service';
import { StudentResponse } from '../../../shared/models/student.model';
import { CourseResponse } from '../../../shared/models/course.model';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './enrollment-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnrollmentFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private enrollmentService = inject(EnrollmentService);
  private studentService = inject(StudentService);
  private courseService = inject(CourseService);
  private router = inject(Router);

  loading = false;
  loadingStudents = false;
  loadingCourses = false;
  error: string | null = null;

  students: StudentResponse[] = [];
  courses: CourseResponse[] = [];

  form: FormGroup = this.fb.group({
    studentId: [null, Validators.required],
    courseId: [null, Validators.required],
    enrollmentDate: ['', Validators.required],
  });

  ngOnInit(): void {
    this.loadStudents();
    this.loadCourses();
    // default date to today
    const today = new Date().toISOString().split('T')[0];
    this.form.patchValue({ enrollmentDate: today });
  }

  private loadStudents(): void {
    this.loadingStudents = true;
    this.studentService.getAll(0, 100).subscribe({
      next: (page) => {
        this.loadingStudents = false;
        this.students = page.content;
      },
      error: () => {
        this.loadingStudents = false;
        this.error = 'Failed to load students.';
      },
    });
  }

  private loadCourses(): void {
    this.loadingCourses = true;
    this.courseService.getAll(0, 100).subscribe({
      next: (page) => {
        this.loadingCourses = false;
        this.courses = page.content;
      },
      error: () => {
        this.loadingCourses = false;
        this.error = 'Failed to load courses.';
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = null;

    this.enrollmentService.enroll(this.form.value).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/enrollments']);
      },
      error: () => {
        this.loading = false;
        this.error = 'Something went wrong. Please try again.';
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/enrollments']);
  }
}
