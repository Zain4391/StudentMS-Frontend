import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { AuthResponse, LoginRequest } from "../../shared";
import { Observable, tap } from "rxjs";
import { environment } from "../../../environments/env";


interface StoredUser {
    id: number;
    email: string;
    roles: string[];
    token: string;
}

@Injectable({ providedIn: "root" })
export class AuthService {

    private readonly http = inject(HttpClient);
    private readonly router = inject(Router);

    private readonly _currentUser = signal<StoredUser | null>( this.loadFromStorage());

    readonly isLoggedIn = computed(() => this._currentUser() !== null);
    readonly currentUser = computed(() => this._currentUser());
    readonly token = computed(() => this._currentUser()?.token ?? null);

    readonly role = computed(() => {
        const roles = this._currentUser()?.roles ?? [];
        if (roles.length === 0) return null;
        return roles[0].replace('ROLE_', '');
    });

    readonly isStudent = computed(() => this.role() === 'STUDENT');
    readonly isTeacher = computed(() => this.role() === 'TEACHER');
    readonly isAdmin   = computed(() => this.role() === 'ADMIN');

    loginStudent(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/student/login`, credentials)
      .pipe(tap(response => this.handleLoginSuccess(response)));
    }

  loginTeacher(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/teacher/login`, credentials)
      .pipe(tap(response => this.handleLoginSuccess(response)));
    }

  logout(): void {
    this._currentUser.set(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/auth/login']);
  }

    private loadFromStorage(): StoredUser | null {
        const raw = localStorage.getItem('currentUser');

        if(!raw) {
            return null;
        }

        try {
            return JSON.parse(raw) as StoredUser;
        } catch {
            return null;
        }
    }

    private handleLoginSuccess(response: AuthResponse): void {
    const user: StoredUser = {
      id: response.id,
      email: response.email,
      roles: response.roles,
      token: response.token,
    };
    localStorage.setItem('currentUser', JSON.stringify(user));
    this._currentUser.set(user);  // triggers all computed() signals above
  }
}