import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router,private cookie:CookieService) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res: any) => {
        
        if(typeof window !== 'undefined' && res.token && res.role){
            if (res.role !== 'admin') {
              localStorage.setItem('token', res.token);
              localStorage.setItem('role', res.role);
            }
            else{
              this.cookie.set('token',res.token,{ expires: 1 });
              this.cookie.set('role',res.role,{ expires: 1 });
            }
        }
        this.navigateToDashboard(res.role);
      },
      error: (err) => {
        console.info('Login error:', err);
      }
    });
  }

  navigateToDashboard(role:string){
    if (role === 'admin') {
      console.info("admin dashboard");
      this.router.navigate(['/admin-dashboard']);
    } else if (role === 'buyer') {
      this.router.navigate(['/buyer-dashboard']);
    } else if (role === 'seller') {
      this.router.navigate(['/seller-dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
