import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class Adminguard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private cookie: CookieService) {}

  canActivate(): boolean {
    const token = this.authService.getToken(0);
    let role: string | null = null;

    if (typeof window !== 'undefined') {
      role = localStorage.getItem('role');
    }

    if (token && role !== 'admin') {
      return true;
    }

    if (typeof window !== "undefined") {
      alert("You Have Not Logged In");
    }

    this.authService.logout();
    this.router.navigate(['/login']);
    return false;
  }
}