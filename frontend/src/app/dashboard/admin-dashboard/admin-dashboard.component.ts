import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  admin: any = {};

  constructor(private authService: AuthService, private router: Router, private cookie:CookieService) {}

  ngOnInit(){ 
    this.loadAdminProfile();
  }

  loadAdminProfile() {
    this.authService.getAdminProfile().subscribe({
      next: (adminData) => {
        console.info("Admin profile fetched successfully:", adminData);
        this.admin = adminData;
      },
      error: (err) => {
        console.error("Error fetching user profile:", err);
      }
    });
  }

  adminlogout() {
    this.authService.adminlogout();
  }
}
