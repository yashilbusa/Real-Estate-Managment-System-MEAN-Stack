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
  constructor(private authService: AuthService, private router: Router, private cookie:CookieService) {}

  adminlogout(){
    if (typeof window !== 'undefined') {
      this.cookie.deleteAll();
    }
    console.log("Log Out Successfully");
    
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
  }
}
