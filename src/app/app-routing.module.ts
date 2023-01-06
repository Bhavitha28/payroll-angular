import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component'
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
 import { AdminGuard } from './services/admin.guard';
import { EmployeeGuard } from './employee.guard';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    pathMatch: 'full',
  },
  {            
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path:'login',
    component: LoginComponent,
    pathMatch:'full',

  },
  {
    path:'admin-dashboard',
    component:AdminDashboardComponent,
    
     canActivate:[AdminGuard],
     
  },

  {
    path:'employee-dashboard',
    component:EmployeeDashboardComponent,
    pathMatch:'full',
    canActivate:[EmployeeGuard]
  },
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
