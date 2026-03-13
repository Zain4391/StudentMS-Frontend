import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  templateUrl: './toast.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  readonly toastService = inject(ToastService);
}
