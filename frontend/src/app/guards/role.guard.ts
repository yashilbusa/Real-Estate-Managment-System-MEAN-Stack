import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private cookie:CookieService) {}

  canActivate(): boolean {
    const token = this.authService.getToken(0); 
    const role = localStorage.getItem('role');

    if (!token && role !== 'buyer' && role !== 'seller' && role !== 'agent') {
      return true;
    }
    
    // this.authService.logout();
    this.router.navigate(['/login']);
    return false;
  }
}