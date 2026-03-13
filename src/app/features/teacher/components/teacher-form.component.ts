import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../../../core/services/teacher.service';

@Component({
  selector: 'app-teacher-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './teacher-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(TeacherService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  teacherId: number | null = null;
  isEditMode = false;
  loading = false;
  error: string | null = null;

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    department: ['', [Validators.required]],
    specialization: ['', [Validators.required]],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.teacherId = +id;
      this.isEditMode = true;

      this.form.get('password')?.clearValidators();
      this.form.get('password')?.updateValueAndValidity();
      this.loadTeacher(this.teacherId);
    }
  }

  private loadTeacher(id: number): void {
    this.loading = true;
    this.service.getById(id).subscribe({
      next: (teacher) => {
        this.loading = false;
        this.form.patchValue({
          name: teacher.name,
          email: teacher.email,
          department: teacher.department,
          specialization: teacher.specialization,
        });
      },
      error: () => {
        this.loading = false;
        this.error = 'Failed to load teacher';
      },
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = null;

    const value = this.form.value;

    const request$ = this.isEditMode
      ? this.service.update(this.teacherId!, value)
      : this.service.create(value);

    request$.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.loading = false;
        this.error = 'Something went wrong, please try again';
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/teachers']);
  }
}
