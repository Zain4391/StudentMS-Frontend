import { Role } from "./enums";

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