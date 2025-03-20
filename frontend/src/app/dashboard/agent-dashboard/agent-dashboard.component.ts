import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './agent-dashboard.component.html',
  styleUrl: './agent-dashboard.component.css'
})
export class AgentDashboardComponent {
  constructor(private authService: AuthService, private router: Router) {}
  
  logout() {
    this.authService.logout();
  }
}
