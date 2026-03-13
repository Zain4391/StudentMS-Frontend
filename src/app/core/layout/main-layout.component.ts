import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './navbar.component';
import { ToastComponent } from '../../shared/components/toast.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, ToastComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {}
