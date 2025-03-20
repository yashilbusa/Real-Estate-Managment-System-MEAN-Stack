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
    const token = this.authService.getToken(1); 
    const role = localStorage.getItem('role') || this.cookie.get('token');

    if (token && role !== 'buyer') {
      return true;
    }
    else if(token && role !== 'seller'){
      return true;
    }
    else if(token && role !== 'agent'){
      return true;
    }
    
    // this.authService.logout();
    this.router.navigate(['/login']);
    return false;
  }
}