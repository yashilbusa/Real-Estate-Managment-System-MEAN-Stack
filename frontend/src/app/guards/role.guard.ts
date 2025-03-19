import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router, private authservice:AuthService) {}

  canActivate(): boolean {
    
    const role = this.authservice.getRole();

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
      return false;
    }

    return true;
  }
}
