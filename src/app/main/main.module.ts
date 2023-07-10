import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { PhotoCarouselComponent } from '../components/photo-carousel/photo-carousel.component';
import { SignUpFormComponent } from './sign-up/sign-up-form/sign-up-form.component';



@NgModule({
  declarations: [
    PhotoCarouselComponent,
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    ConfirmPasswordComponent,
    ConfirmEmailComponent,
    LoginFormComponent,
    SignUpFormComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
})
export class MainModule {}
