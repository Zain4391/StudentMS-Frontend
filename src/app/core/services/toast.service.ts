import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toasts = signal<Toast[]>([]);
  private counter = 0;

  show(message: string, type: 'success' | 'error' = 'success'): void {
    const id = ++this.counter;
    this.toasts.update((t) => [...t, { id, message, type }]);
    setTimeout(() => this.dismiss(id), 3500);
  }

  success(message: string): void {
    this.show(message, 'success');
  }
  error(message: string): void {
    this.show(message, 'error');
  }

  dismiss(id: number): void {
    this.toasts.update((t) => t.filter((toast) => toast.id !== id));
  }
}
