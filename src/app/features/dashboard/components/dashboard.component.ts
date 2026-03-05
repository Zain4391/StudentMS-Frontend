import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {{ user()?.email }}! You are logged in as <strong>{{ role() }}</strong>.</p>
      <nav>
        <a routerLink="/students">Students</a> |
        <a routerLink="/teachers">Teachers</a> |
        <a routerLink="/courses">Courses</a> |
        <a routerLink="/enrollments">Enrollments</a>
      </nav>
      <button (click)="logout()">Logout</button>
    </div>
  `
})
export class DashboardComponent {
  private readonly authService = inject(AuthService);

  readonly user = computed(() => this.authService.currentUser());
  readonly role = computed(() => this.authService.role());

  logout(): void {
    this.authService.logout();
  }
}