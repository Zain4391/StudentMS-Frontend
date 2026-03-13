import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../core/services/course.service';
import { TeacherService } from '../../../core/services/teacher.service';
import { TeacherResponse } from '../../../shared/models/teacher.model';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './course-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private courseService = inject(CourseService);
  private teacherService = inject(TeacherService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  courseId: number | null = null;
  isEditMode = false;
  loading = false;
  loadingTeachers = false;
  error: string | null = null;
  teachers: TeacherResponse[] = [];

  form: FormGroup = this.fb.group({
    courseCode: ['', Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required],
    creditHours: [null, [Validators.required, Validators.min(1)]],
    maxCapacity: [null, [Validators.required, Validators.min(1)]],
    teacherId: [null, Validators.required],
  });

  ngOnInit(): void {
    this.loadTeachers();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.courseId = +id;
      this.isEditMode = true;
      this.loadCourse(this.courseId);
    }
  }

  private loadTeachers(): void {
    this.loadingTeachers = true;
    this.teacherService.getAll(0, 100).subscribe({
      next: (page) => {
        this.loadingTeachers = false;
        this.teachers = page.content;
      },
      error: () => {
        this.loadingTeachers = false;
        this.error = 'Failed to load teachers.';
      },
    });
  }

  private loadCourse(id: number): void {
    this.loading = true;
    this.courseService.getById(id).subscribe({
      next: (course) => {
        this.loading = false;
        this.form.patchValue({
          courseCode: course.courseCode,
          name: course.name,
          description: course.description,
          creditHours: course.creditHours,
          maxCapacity: course.maxCapacity,
          teacherId: course.teacher.id,
        });
      },
      error: () => {
        this.loading = false;
        this.error = 'Failed to load course.';
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

    const request$ = this.isEditMode
      ? this.courseService.update(this.courseId!, this.form.value)
      : this.courseService.create(this.form.value);

    request$.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/courses']);
      },
      error: () => {
        this.loading = false;
        this.error = 'Something went wrong. Please try again.';
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/courses']);
  }
}
