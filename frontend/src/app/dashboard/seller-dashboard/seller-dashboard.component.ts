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

  constructor(private authService: AuthService, private router: Router, private http: HttpClient, private propertyService: PropertyService ) {}

  ngOnInit() {
    this.getAllProperty();
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.authService.getUserProfile().subscribe({
      next: (userData) => {
        console.info("User profile fetched successfully:", userData);
        this.user = userData;
      },
      error: (err) => {
        console.error("Error fetching user profile:", err);
      }
    });
  }

  addNewProperty(){
    this.router.navigate(['/add-property']);
  }

  logout() {
    this.authService.logout();
    console.info('Logout clicked');
  }

  getAllProperty(){
    this.propertyService.fetchAllProperty().subscribe((p:any)=>{
      this.properties = p;
      // console.info(this.properties);
    });
  }

  editProperty(property: any) {
    this.router.navigate(['/edit-property', property._id]);
  }

  deleteProperty(propertyId: string) {
    if (confirm("Are you sure you want to delete this property?")) {
      this.propertyService.deleteProperty(propertyId).subscribe({
        next: () => {
          alert("Property deleted successfully!");
          this.getAllProperty();
        },
        error: (err) => {
          console.error("Error deleting property:", err);
        }
      });
    }
  }
}
  
