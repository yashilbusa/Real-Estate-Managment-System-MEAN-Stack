import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PropertyService } from '../../services/property.service';

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

  constructor(private authService: AuthService, private router: Router, private http: HttpClient, private propertyService: PropertyService ) {
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

    const formData = new FormData();
    formData.append('propertyName', this.property.propertyName);
    formData.append('squarefeet', String(this.property.squarefeet));
    formData.append('country', this.property.country);
    formData.append('state', this.property.state);
    formData.append('city', this.property.city);
    formData.append('price', String(this.property.price));

    if (this.selectedFile) {
      formData.append('propertyImage', this.selectedFile);
    }

    this.propertyService.createProperty(formData).subscribe(
      response => {
        console.log('Property listed successfully', response);
        alert('Property listed successfully!');
        this.resetForm();
      },
      error => {
        console.error('Error listing property:', error);
        alert('Failed to list property.');
      }
    );
  }

  resetForm() {
    this.property = {
      propertyName: '',
      squarefeet: null,
      country: 'India',
      state: '',
      city: '',
      price: null
    };
    this.selectedFile = null;
    this.imageError = null;
  }
}
  
