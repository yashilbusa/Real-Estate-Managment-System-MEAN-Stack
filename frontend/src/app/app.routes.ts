import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { BuyerDashboardComponent } from './dashboard/buyer-dashboard/buyer-dashboard.component';
import { SellerDashboardComponent } from './dashboard/seller-dashboard/seller-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { Adminguard } from './guards/admin.guard';
import { RoleGuard } from './guards/role.guard';
import { RedirectGuard } from './guards/redirect.guard';
import { EditPropertyComponent } from './dashboard/seller-dashboard/edit-property/edit-property.component';
import { AddPropertyComponent } from './dashboard/seller-dashboard/add-property/add-property.component';

export const routes: Routes = [
    { path: 'signup', component:SignupComponent, canActivate: [RedirectGuard]},
    { path: 'login', component:LoginComponent, canActivate: [RedirectGuard]},
    { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [Adminguard]},
    { path: 'buyer-dashboard', component: BuyerDashboardComponent, canActivate: [AuthGuard,RoleGuard] },
    { path: 'seller-dashboard', component: SellerDashboardComponent, canActivate: [AuthGuard,RoleGuard] },
    { path: 'add-property', component:AddPropertyComponent, canActivate: [AuthGuard] },
    { path: 'edit-property/:id', component:EditPropertyComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo:'signup', pathMatch:'full'}
];