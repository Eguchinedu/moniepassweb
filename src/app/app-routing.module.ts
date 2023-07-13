import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainModule } from './main/main.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './main/login/login.component';
import { SignUpComponent } from './main/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './main/forgot-password/forgot-password.component';
import { ConfirmPasswordComponent } from './main/confirm-password/confirm-password.component';
import { ConfirmEmailComponent } from './main/confirm-email/confirm-email.component';
import { LoginGuard } from './guard/login.guard';


const routes: Routes = [
  {
    path: 'forgot-pwd/confirm-pwd',
    component: ConfirmPasswordComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'forgot-pwd',
    component: ForgotPasswordComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'sign-up/confirm-email',
    component: ConfirmEmailComponent,
    canActivate: [LoginGuard],
  },
  { path: 'sign-up', component: SignUpComponent, 
  canActivate: [LoginGuard]
 },
  { path: 'login', component: LoginComponent , 
  canActivate: [LoginGuard] 
},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes), MainModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
