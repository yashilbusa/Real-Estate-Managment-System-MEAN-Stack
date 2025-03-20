import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class Adminguard implements CanActivate {

 constructor(private router: Router, private authService: AuthService, private cookie:CookieService) {}
 
   canActivate(): boolean {
     const isLoggedin = this.authService.isAuthenticatedAdmin();
     if (typeof window !== 'undefined' && this.cookie.get('token') && isLoggedin) {
       return true;
     } else {
       this.router.navigate(['/login']);
       return false;
     }
   }
}

