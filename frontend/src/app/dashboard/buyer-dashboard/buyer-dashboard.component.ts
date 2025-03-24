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

  properties: any[] = []
  constructor(private authService: AuthService, private router: Router, private property: PropertyService) {}
  
  ngOnInit() {
    this.getAllProperty();
  }

  logout() {
    this.authService.logout();
  }

  getAllProperty(){
    this.property.fetchAllProperty().subscribe((p:any)=>{
      this.properties = p;
    });
  }
}
