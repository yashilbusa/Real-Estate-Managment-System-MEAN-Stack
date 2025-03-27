import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buyer-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './buyer-dashboard.component.html',
  styleUrl: './buyer-dashboard.component.css'
})
export class BuyerDashboardComponent {

  properties: any[] = [];
  fProperties: any[] = [];

  searchCriteria = { city: '', minPrice: null, maxPrice: null, minSize: null, maxSize: null };

  user: any = {};
  reqFlag: any = true;

  constructor(private authService: AuthService, private router: Router, private property: PropertyService) {}

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

  logout() {
    this.authService.logout();
  }

  getAllProperty(){
    this.property.fetchAllProperty().subscribe((p:any)=>{
      this.properties = p;
      this.fProperties = p;
      console.info(this.properties);
    });
  }

  filterProperties(){ 
    this.fProperties = this.properties.filter(p=>{
      const matchCity = this.searchCriteria.city ? p.location.city.toLowerCase().includes(this.searchCriteria.city.toLowerCase()) : true;
      const matchMinPrice =  this.searchCriteria.minPrice ? p.price >= this.searchCriteria.minPrice : true;
      const matchMaxPrice =  this.searchCriteria.maxPrice ? p.price <= this.searchCriteria.maxPrice : true;
      const matchMinSize = this.searchCriteria.minSize ? p.popertyDimension.squarefeet >= this.searchCriteria.minSize : true;
      const matchMaxSize = this.searchCriteria.maxSize ? p.popertyDimension.squarefeet <= this.searchCriteria.maxSize : true;

      return matchCity && matchMinPrice && matchMaxPrice && matchMinSize && matchMaxSize;
    })
  }

  buyProperty(sellerId:any,buyerId:any,propertyId:any){
    if(this.reqFlag == true) {
        this.property.reqBuyProperty(sellerId,buyerId,propertyId,this.reqFlag).subscribe({
          next: () =>{
            alert('Your Buying Request is Sent to Seller!!!');
            console.info('Request is Sent to Seller');
            this.reqFlag = false;
          },
          error: (err) => {
            console.error("Error in requesting property:", err);
          }
        });
      }
      else{
        alert('You Can Not Post Another Request, You Already Post Request For This Property  ');
      }
    }
}
