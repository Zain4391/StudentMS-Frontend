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