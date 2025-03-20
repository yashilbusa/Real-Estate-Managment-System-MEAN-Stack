import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { AgentDashboardComponent } from './dashboard/agent-dashboard/agent-dashboard.component';
import { BuyerDashboardComponent } from './dashboard/buyer-dashboard/buyer-dashboard.component';
import { SellerDashboardComponent } from './dashboard/seller-dashboard/seller-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
    { path: 'signup', component:SignupComponent},
    { path: 'login', component:LoginComponent},
    { path: 'admin-dashboard', component: AdminDashboardComponent},
    { path: 'buyer-dashboard', component: BuyerDashboardComponent},
    { path: 'seller-dashboard', component: SellerDashboardComponent},
    { path: 'agent-dashboard', component: AgentDashboardComponent},
    { path: '**', redirectTo:'signup', pathMatch:'full'}
];
