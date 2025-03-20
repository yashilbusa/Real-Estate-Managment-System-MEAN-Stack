import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { AgentDashboardComponent } from './dashboard/agent-dashboard/agent-dashboard.component';
import { BuyerDashboardComponent } from './dashboard/buyer-dashboard/buyer-dashboard.component';
import { SellerDashboardComponent } from './dashboard/seller-dashboard/seller-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { Adminguard } from './guards/admin.guard';

export const routes: Routes = [
    { path: 'signup', component:SignupComponent},
    { path: 'login', component:LoginComponent},
    { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [Adminguard] },
    { path: 'buyer-dashboard', component: BuyerDashboardComponent, canActivate: [AuthGuard], data: { role: 'buyer' } },
    { path: 'seller-dashboard', component: SellerDashboardComponent, canActivate: [AuthGuard], data: { role: 'seller' } },
    { path: 'agent-dashboard', component: AgentDashboardComponent, canActivate: [AuthGuard], data: { role: 'agent' } },
    { path: '**', redirectTo:'signup', pathMatch:'full'}
];
