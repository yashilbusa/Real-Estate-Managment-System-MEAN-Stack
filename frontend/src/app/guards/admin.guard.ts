import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class Adminguard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = this.authService.getToken(0);
    if (token) {
      this.authService.logout();
      return true;
    }
    if (typeof window !== "undefined") {
      alert("You Have Not Logged In");
    }
    this.router.navigate(['/login']);
    return false;
  }
}
