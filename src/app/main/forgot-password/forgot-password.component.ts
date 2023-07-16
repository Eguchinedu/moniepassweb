import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  postError = false;
  postErrorMessage = '';
  isLoading: boolean = false;
  forgotPassForm: FormGroup;

  constructor(
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {
    this.forgotPassForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }
  ngOnInit() {}

  get f() {
    return this.forgotPassForm.controls;
  }

  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

  onSubmit() {
    if (this.forgotPassForm.valid) {
        this.isLoading = true;
      const user = this.forgotPassForm.getRawValue();
      console.log(user);
      this.auth
        .forgotPass(this.forgotPassForm.getRawValue())
        .subscribe((result) => {
          if (result.success == true) {
            console.log(result);
            this.toastr.success(
              'Code Sent! Kindly check your email',
              'Success!'
            );
            this.auth.setEmail(user.email);
            this.router.navigate(['forgot-pwd/confirm-pwd']);
          } else {
            this.toastr.error(result.errorReason, 'Error!');
          }
        });
    } else {
      this.toastr.error('Invalid credentials', 'Error!');
    }
  }
}
