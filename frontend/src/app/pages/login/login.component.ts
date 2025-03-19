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
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        console.info("Login successful", res);
        if (typeof window !== 'undefined' && res.token) {
          localStorage.setItem('token', res.token); 
        }
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error("Login error:", err);
      }
    });
  }
}
