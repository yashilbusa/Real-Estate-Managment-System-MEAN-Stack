import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.backendUrl;

  constructor(private http: HttpClient) { }

  signup(name:string, email: string, password: string, role:string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { name, email, password, role });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  adminLogin(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/adminlogin`, { email, password });
  }
}
