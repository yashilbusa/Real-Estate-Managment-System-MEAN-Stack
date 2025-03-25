import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  apiUrl = environment.backendUrl;
  
  constructor(private http: HttpClient) { }

  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${
          typeof window !== 'undefined' ? localStorage.getItem('token') : ''
        }`
      })
    };
  }  
  
  fetchAllProperty(){
    return this.http.get(`${this.apiUrl}/getAllProperty`, this.getHeaders());
  }

  createProperty(propertyData: any){
    return this.http.post(`${this.apiUrl}/listNewProperty`, propertyData, this.getHeaders());
  }
}
