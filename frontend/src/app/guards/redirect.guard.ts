import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {

  constructor(private router: Router, private authService:AuthService) {}

  canActivate(): boolean {
    let token: string | null = null;
    let role: string | null = null;

    if (typeof window !== 'undefined') {
      token = this.authService.getToken(1) || this.authService.getToken(0);
      role = localStorage.getItem('role');
    }

    if (token && role) {
      alert("You are already logged in!");

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

      return false;
    }

    return true; 
  }
}