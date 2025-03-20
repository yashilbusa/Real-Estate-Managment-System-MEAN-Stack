import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.css'
})
export class SellerDashboardComponent {
  constructor(private authService: AuthService, private router: Router) {}
  
  logout() {
    this.authService.logout();
  }
}
