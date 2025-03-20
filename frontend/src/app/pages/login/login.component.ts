import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res: any) => {
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.role);
        }
        
        const role = this.authService.getRole();

        if (role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else if (role === 'buyer') {
          this.router.navigate(['/buyer-dashboard']);
        } else if (role === 'seller') {
          this.router.navigate(['/seller-dashboard']);
        } else if (role === 'agent') {
          this.router.navigate(['/agent-dashboard']);
        } else {
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.error('Login error:', err);
      }
    });
  }
}
