import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PropertyService } from '../../../services/property.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-property',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './edit-property.component.html',
  styleUrl: './edit-property.component.css'
})
export class EditPropertyComponent {

  property: any = {
    propertyName: '',
    squarefeet: '',
    price: ''
  };  
  constructor( private route: ActivatedRoute, private router: Router, private propertyService: PropertyService) {}
  
  ngOnInit() {
    const propertyId = this.route.snapshot.paramMap.get('id');
    if (propertyId) {
      this.propertyService.fetchAllProperty().subscribe((p: any) => {
        this.property = p;
      });
    }
  }

  updateProperty() {
    this.propertyService.updateProperty(this.property._id, this.property).subscribe({
      next: () => {
        alert("Property updated successfully!");
        this.router.navigate(['/seller-dashboard']);
      },
      error: (err) => {
        console.error("Error updating property:", err);
      }
    });
  }
}
