import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private auth = inject(AuthService);

  readonly user = computed(() => this.auth.currentUser());
  readonly role = computed(() => this.auth.role());
  readonly isAdmin = computed(() => this.auth.isAdmin());
  readonly isTeacher = computed(() => this.auth.isTeacher());
  readonly isStudent = computed(() => this.auth.isStudent());
}
