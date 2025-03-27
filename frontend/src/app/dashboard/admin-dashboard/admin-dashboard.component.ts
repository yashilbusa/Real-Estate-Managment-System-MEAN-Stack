import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { error } from 'console';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  admin: any = {};

  buyers: any[] = [];
  sellers: any[] = [];
  sellerProperties: any[] =[];
  selectedSellerId: string = ';'

  constructor(private authService: AuthService, private router: Router, private cookie:CookieService, private adminservice: AdminService) {}

  ngOnInit(){ 
    this.loadAdminProfile();
    this.fetchBuyers();
    this.fetchSellers();
  }

  loadAdminProfile() {
    this.authService.getAdminProfile().subscribe({
      next: (adminData) => {
        console.info("Admin profile fetched successfully:", adminData);
        this.admin = adminData;
      },
      error: (err) => {
        console.error("Error fetching user profile:", err);
      }
    });
  }

  adminlogout() {
    this.authService.adminlogout();
  }

  fetchBuyers(){
    this.adminservice.getAllBuyers().subscribe({
      next: (allBuyers:any) => {
        console.info("Buyers fetched successfully:", allBuyers);
        this.buyers = allBuyers;
      },
      error: (err) => {
        console.error("Error in fetching ", err);
      }
    });
  }

  fetchSellers(){
    this.adminservice.getAllSellers().subscribe({
      next: (allSellers:any) => {
        console.info("Sellers fetched successfully:", allSellers);
        this.sellers = allSellers;
      },
      error: (err) => {
        console.error("Error in fetching ", err);
      }
    });
  }

  deleteUser(userId:any){
    this.adminservice.deleteUser(userId).subscribe({
      next: () => {
        console.info("User Delted Succesfully");
        this.fetchBuyers();
        this.fetchSellers();

        if(this.selectedSellerId == userId){
          this.sellerProperties = [];
        }
      },
      error(err) {
        console.error("Error in fetching ", err);
      }
    });
  }

  fetchSellerProperties(sellerId:any){
    this.selectedSellerId = sellerId;
    this.adminservice.fetchSellerProperties(sellerId).subscribe({
      next: (sp:any) =>{
        this.sellerProperties = sp;
        console.info("Seller Properties Fetched Succesfully",sp);
      },
      error(err) {
        console.error("Error in fetching ", err);
      }
    })
  }
}
