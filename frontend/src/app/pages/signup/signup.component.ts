import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  name:string = '';
  email: string = '';
  password: string = '';
  role:string ='buyer';
  

  apiUrl = environment.backendUrl
  
  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

  signup() {
    this.authService.signup(this.name, this.email, this.password, this.role).subscribe({
      next: (res) => {
        console.info("Signup successful", res);
      this.router.navigate(['/login']);
      },
      error: (err) => {
        console.info("Signup error:", err);
      }
    });
  }
}
