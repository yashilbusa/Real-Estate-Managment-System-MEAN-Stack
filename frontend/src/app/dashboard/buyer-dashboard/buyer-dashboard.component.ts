import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buyer-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './buyer-dashboard.component.html',
  styleUrl: './buyer-dashboard.component.css'
})
export class BuyerDashboardComponent {
  constructor(private authService: AuthService, private router: Router) {}
  
  logout() {
    this.authService.logout();
  }
}
