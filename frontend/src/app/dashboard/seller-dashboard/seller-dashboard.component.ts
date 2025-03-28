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
  buyRequests: any[] = [];
  propertyId: string = '';

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
    this.getSellerProperties();
    this.loadUserProfile();
    this.getBuyRequests();
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

  getSellerProperties(){
    this.propertyService.getSellerProperties().subscribe((p:any)=>{
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
          this.propertyId = propertyId;
          alert("Property deleted successfully!");
          this.getSellerProperties();
        },
        error: (err) => {
          console.error("Error deleting property:", err);
        }
      });
    }
  }

  getBuyRequests(){
    this.propertyService.getSellerBuyRequests(this.user.id).subscribe({
      next: (requests:any) =>{
        this.buyRequests = requests;
        // console.info(this.user.id);
        console.info("Buy Requests are:",this.buyRequests);
      },
      error: (error) =>{
        // console.info(this.user.id);
        console.info("Error in fetching requests:",error);
      }
    })
  }

  updateReqStatus(requestId:any,status:any){
    this.propertyService.updateReqStatus(requestId,status).subscribe({
      next: (response:any) =>{
        alert("Request Successfully");
        this.getBuyRequests();
      },
      error: (error) =>{
        console.info("Error in updating request:",error);
        alert("Failed to Update Status");
      }
    })
  }
}
  
