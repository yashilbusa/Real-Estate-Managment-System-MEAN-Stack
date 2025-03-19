import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-adminlogin',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css'
})
export class AdminloginComponent {
  constructor(private authService: AuthService, private router: Router,private cookie:CookieService) {}
  
  email: string = '';
  password: string = '';
  
  adminlogin(){
    this.authService.adminLogin(this.email, this.password).subscribe({
      next:(res)=>{
        console.info("Login successful", res);
        if (typeof window !== 'undefined' && res.token) {
          this.cookie.set('token',res.token,{ expires: 5 });
          // sessionStorage.setItem('token', res.token); 
        }
        this.router.navigate(['/adminDashboard']);
      },
      error: (err) => {
        console.error(`Admin Login error ${err}`);
      }
    });
  }
}
