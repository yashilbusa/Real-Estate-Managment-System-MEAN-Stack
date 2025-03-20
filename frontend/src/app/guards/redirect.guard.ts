import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RedirectGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = this.authService.getToken(1) || this.authService.getToken(0); 

    if (!token) {
      if (typeof window !== "undefined") {
        alert('You must first log out before accessing this page.');
      }
      return false; 
    }

    return true; 
  }
}
