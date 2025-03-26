import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PropertyService } from '../../../services/property.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-property',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-property.component.html',
  styleUrl: './edit-property.component.css'
})
export class EditPropertyComponent {
  property: any = {
    propertyName: '',
    squarefeet: null,
    country: 'India',
    state: '',
    city: '',
    price: null
  };

  states: { name: string; iso2: string }[] = [];
  cities: string[] = [];
  imageError: string | null = null;
  selectedFile: File | null = null;
  propertyId: any;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private propertyService: PropertyService) {
    this.fetchStates();
  }

  ngOnInit() {
    this.propertyId = this.route.snapshot.paramMap.get('id');

    if (this.propertyId) {
      this.propertyService.getSellerProperties().subscribe({
        next: (pdata) => {
          this.property = pdata;
        },
        error: (err) => {
          console.error("Error fetching property:", err);
        }
      });
    }
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

  updateProperty() {
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

    this.propertyService.updateProperty(this.propertyId, formData).subscribe({
      next: () => {
        alert("Property updated successfully!");
        this.router.navigate(['/seller-dashboard']);
      },
      error: (err) => {
        console.error("Error updating property:", err);
      }
    });
  }

  cancel() {
    this.router.navigate(['/seller-dashboard']);
  }
}
