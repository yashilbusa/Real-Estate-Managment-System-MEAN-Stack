import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.backendUrl;
  redirectUrl: string = '';
  isLoggedIn = false;

  constructor(private http: HttpClient, private router:Router, private cookie:CookieService) { }

  signup(name: string, email: string, password: string, role: string) {
    return this.http.post(`${this.apiUrl}/signup`, { name, email, password, role });
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string; role: string }>(`${this.apiUrl}/login`, { email, password });
  }  
  
  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
    console.log("Log Out Successfully");
    
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
  }

  getToken(flag:number):any {
    if(flag == 1){
        if (typeof window !== "undefined") {
          return localStorage.getItem("token");
      }
    } else{
        if (typeof window !== "undefined") {
          return this.cookie.get('token');
      }
    }
  }

  isAuthenticatedUser(){
    return !!this.getToken(1);
  }

  isAuthenticatedAdmin(){
    return !!this.getToken(0);
  }
}
