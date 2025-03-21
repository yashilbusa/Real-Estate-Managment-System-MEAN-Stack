import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}
    
      canActivate(): boolean {
        const token = this.authService.getToken(1 );
        if (token) {
          return true;
        }
        if (typeof window !== "undefined") {
            alert("You Have Not Logged In");
        }
        this.router.navigate(['/login']);
        return false;
    }
}
