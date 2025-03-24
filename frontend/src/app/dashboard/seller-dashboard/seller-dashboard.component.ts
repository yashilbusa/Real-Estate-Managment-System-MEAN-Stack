import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.css'
})
export class SellerDashboardComponent {
  property: any = {
    propertyName: '',
    squarefeet: null,
    country: 'India',
    state: '',
    city: '',
    price: null
  };

  imageError: string | null = null;
  selectedFile: File | null = null;
  states: { name: string; iso2: string }[] = []; 
  cities: string[] = [];

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {
    this.fetchStates();
  }

  logout() {
    this.authService.logout();
    console.log('Logout clicked');
  }

  fileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        this.imageError = 'Only JPG, JPEG, or PNG files are allowed.';
        this.selectedFile = null;
      } else {
        this.imageError = null;
        this.selectedFile = file;
      }
    }
  }

  fetchStates() {
    const url = `https://api.country-state-city.rebuscando.info/public/getStates?idcountry=101`;
    this.http.get<any>(url).subscribe(
      response => this.states = response.map((state: any) => ({ name: state.name, id: state.id })),
      error => console.error('Error fetching states:', error)
    );
  }

  fetchCities() {
    if (this.property.state) {
      const url = `https://api.country-state-city.rebuscando.info/public/getCities?idstate=${this.property.state}`;
      this.http.get<any>(url).subscribe(
        response => this.cities = response.map((city: any) => city.name),
        error => console.error('Error fetching cities:', error)
      );
    }
  }


  uploadProperty(): void {
    if (!this.property.propertyName || !this.property.squarefeet || !this.property.price || !this.selectedFile) {
      this.imageError = 'Please fill in all required fields and upload an image.';
      return;
    }
  }
}
