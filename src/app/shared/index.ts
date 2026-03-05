// ─── Enums ────────────────────────────────────────────────────────────────────

export type Role = 'ADMIN' | 'TEACHER' | 'STUDENT';
export type Grade = 'A' | 'B' | 'C' | 'D' | 'E' | 'FAIL';

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  id: number;
  email: string;
  roles: string[];  // e.g. ["ROLE_STUDENT"]
}

// ─── Student ──────────────────────────────────────────────────────────────────

export interface StudentRequest {
  name: string;
  email: string;
  password: string;
  major: string;
}

export interface StudentResponse {
  id: number;
  name: string;
  email: string;
  role: Role;
  enrollmentDate: string;  // ISO date string from backend
  major: string;
}

export interface StudentSummary {
  id: number;
  name: string;
  email: string;
  major: string;
}

// ─── Teacher ──────────────────────────────────────────────────────────────────

export interface TeacherRequest {
  name: string;
  email: string;
  password: string;
  department: string;
  specialization: string;
}

export interface TeacherResponse {
  id: number;
  name: string;
  email: string;
  role: Role;
  department: string;
  specialization: string;
}

// ─── Course ───────────────────────────────────────────────────────────────────

export interface CourseRequest {
  courseCode: string;
  name: string;
  description: string;
  creditHours: number;
  maxCapacity: number;
  teacherId: number;
}

export interface CourseResponse {
  id: number;
  courseCode: string;
  name: string;
  description: string;
  creditHours: number;
  maxCapacity: number;
  teacher: TeacherResponse;
}

export interface CourseSummary {
  id: number;
  courseCode: string;
  name: string;
  creditHours: number;
}

// ─── Enrollment ───────────────────────────────────────────────────────────────

export interface EnrollmentRequest {
  studentId: number;
  courseId: number;
  enrollmentDate: string;  // ISO date string
  grade?: Grade;
}

export interface EnrollmentResponse {
  id: number;
  enrollmentDate: string;
  grade: Grade | null;
  student: StudentSummary;
  course: CourseSummary;
}

// ─── Pagination ───────────────────────────────────────────────────────────────
// Matches Spring Boot's Page<T> response shape exactly

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;   // current page (0-indexed from Spring)
  first: boolean;
  last: boolean;
}