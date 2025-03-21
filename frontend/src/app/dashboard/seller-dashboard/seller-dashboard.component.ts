import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.css'
})
export class SellerDashboardComponent {
  
  constructor(private authService: AuthService, private router: Router) {}
  
    property: any = {
    propertyName: '',
    squarefeet: null,
    country: 'India',
    state: '',
    city: '',
    area: '',
    price: null
  };

  imageError: string | null = null;
  selectedFile: File | null = null;

  logout() {
    console.log('Logout clicked'); 
  }

  onFileSelected(event: any) {
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

  uploadProperty(): void {
    if (!this.property.propertyName || !this.property.squarefeet || !this.property.price || !this.selectedFile) {
      this.imageError = 'Please fill in all required fields and upload an image.';
      return;
    }

    const formData = new FormData();
    formData.append('propertyName', this.property.propertyName);
    formData.append('squarefeet', this.property.squarefeet);
    formData.append('country', this.property.country);
    formData.append('city', this.property.city);
    formData.append('area', this.property.area);
    formData.append('price', this.property.price);
    formData.append('propertyImage', this.selectedFile);

    console.log('Form Data Submitted:', formData);
  }
}
