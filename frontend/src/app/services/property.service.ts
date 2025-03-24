import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

    apiUrl = environment.backendUrl;
  
  constructor(private http: HttpClient) { }

  fetchAllProperty(){
    this.http.get(`${this.apiUrl}/getAllProperty`);
  }
}
