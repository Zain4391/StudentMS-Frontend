import { TeacherResponse } from "./teacher.model";

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