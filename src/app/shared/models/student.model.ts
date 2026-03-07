import { Role } from "./enums";

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

export type LoginRole = "STUDENT" | "TEACHER";