import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminloginComponent } from './pages/adminlogin/adminlogin.component';

export const routes: Routes = [
    { path: '**', redirectTo:'signup', pathMatch:'full'},
    { path: 'signup', component:SignupComponent},
    { path: 'login', component:LoginComponent},
    { path: 'adminlogin', component:AdminloginComponent},

];
