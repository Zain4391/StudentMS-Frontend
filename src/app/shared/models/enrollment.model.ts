import { CourseSummary } from "./course.model";
import { Grade } from "./enums";
import { StudentSummary } from "./student.model";

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