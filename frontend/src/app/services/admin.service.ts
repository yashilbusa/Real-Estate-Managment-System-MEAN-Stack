import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  apiUrl = environment.backendUrl;
  
  constructor(private http: HttpClient, private cookie:CookieService) { }

  getHeaders() {
      return {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${
            typeof window !== 'undefined' ? this.cookie.get('token') : ''
        }`
      })
    };
  } 

  getAllBuyers(){
    return this.http.get(`${this.apiUrl}/getAllBuyers`, this.getHeaders());
  }

  getAllSellers(){
    return this.http.get(`${this.apiUrl}/getAllSellers`, this.getHeaders());
  }

  deleteUser(userId:any){
    return this.http.delete(`${this.apiUrl}/deleteUser/${userId}`);
  }

  fetchSellerProperties(sellerId:any){
    return this.http.get(`${this.apiUrl}/fetchSellerProperties/${sellerId}`, this.getHeaders());
  }
}

