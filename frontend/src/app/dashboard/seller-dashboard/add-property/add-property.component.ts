import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { PropertyService } from '../../../services/property.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css'
})
export class AddPropertyComponent {

 user: any = {};
  properties: any[] = [];

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

  ngOnInit() {
    this.getAllProperty();
    this.authService.getUserProfile().subscribe({
      next: (userData) => {
        this.user = userData;
      },
      error: (err) => {
        console.error("Error fetching user profile:", err);
      }
    });
  }
  
  getAllProperty(){
    this.property.fetchAllProperty().subscribe((p:any)=>{
      this.properties = p;
      // console.log(this.properties);
    });
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
    this.http.get<any>('https://api.countrystatecity.in/v1/countries/IN/states', {
      headers: { 'X-CSCAPI-KEY': 'V215TjJIREFvYmJQMnd5MEMycHZRNkN2UzUwbmtBQU0yajBPUE1EYg==' }
    }).subscribe(
      response => this.states = response.map((state: any) => ({ name: state.name, iso2: state.iso2 })),
      error => console.info('Error fetching states:', error)
    );
  }

  fetchCities() {
    if (this.property.state) {
      const code = this.property.state;
      this.http.get<any>(`https://api.countrystatecity.in/v1/countries/IN/states/${code}/cities`, {
        headers: { 'X-CSCAPI-KEY': 'V215TjJIREFvYmJQMnd5MEMycHZRNkN2UzUwbmtBQU0yajBPUE1EYg==' }
      }).subscribe(
        response => this.cities = response.map((city: any) => city.name),
        error => console.info('Error fetching cities:', error)
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
        console.info('Property listed successfully', response);
        alert('Property listed successfully!');
        this.resetForm();
      },
      error => {
        console.info('Error listing property:', error);
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
