import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from '../Auth/auth.guard';

const routes: Routes = [{
  path: '', redirectTo: '/home', pathMatch: 'full'
},
{ path: 'home', component: HomeComponent },
 { path: 'signup', component: SignupComponent },
 {path:'login', component:LoginComponent},


//  {
//   path:'admin',  loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule),
//     canActivate: [authGuard]}, // Add the AuthGuard for the admin route
    {path:'user', loadChildren:()=> import('../user/user.module').then(m=>m.UserModule)}
 // Add the AuthGuard for the user route

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
