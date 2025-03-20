import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken(1) || this.authService.getToken(0);
    const role = localStorage.getItem('role'); 
    const currentPath = state.url;

    if (!token || !role) {
      this.authService.logout(); 
      this.authService.adminlogout();
      this.router.navigate(['/login']);
      return false;
    }

    if (role === 'buyer' && currentPath === '/buyer-dashboard') {
      return true;
    } else if (role === 'seller' && currentPath === '/seller-dashboard') {
      return true;
    } else if (role === 'agent' && currentPath === '/agent-dashboard') {
      return true;
    }

    this.authService.logout();
    this.authService.adminlogout();
    this.router.navigate(['/login']);
    return false;
  }
}
