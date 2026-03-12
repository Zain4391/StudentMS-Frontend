import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../../core/services/student.service';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './student-form.component.html',
})
export class StudentFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(StudentService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  studentId: number | null = null;
  isEditMode = false;
  loading = false;
  error: string | null = null;

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    major: ['', [Validators.required]],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.studentId = +id;
      this.isEditMode = true;
      // password not required on edit
      this.form.get('password')!.clearValidators();
      this.form.get('password')!.updateValueAndValidity();
      this.loadStudent(this.studentId);
    }
  }

  private loadStudent(id: number): void {
    this.loading = true;
    this.service.getById(id).subscribe({
      next: (student) => {
        this.loading = false;
        this.form.patchValue({
          name: student.name,
          email: student.email,
          major: student.major,
        });
      },
      error: () => {
        this.loading = false;
        this.error = 'Failed to load student.';
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

    const value = this.form.value;

    const request$ = this.isEditMode
      ? this.service.update(this.studentId!, value)
      : this.service.create(value);

    request$.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/students']);
      },
      error: () => {
        this.loading = false;
        this.error = 'Something went wrong. Please try again.';
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/students']);
  }
}
