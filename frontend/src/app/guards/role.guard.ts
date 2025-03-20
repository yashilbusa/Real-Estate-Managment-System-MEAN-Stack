import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.authService.getToken(1); 
    const role = localStorage.getItem('role');

    if (token && role !== 'admin') {
        this.authService.logout();
        return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}