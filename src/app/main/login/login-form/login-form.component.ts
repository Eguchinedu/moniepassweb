import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  visible: boolean = true;
  changeType: boolean = true;
  postError = false;
  postErrorMessage = '';
  user!: any;
  isLoading: boolean = false;
  loginForm: FormGroup;

  constructor(
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      isMobileDevice: new FormControl(false),
      mobileDeviceId: new FormControl(''),
    });
  }
  ngOnInit() {}
  viewPass() {
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }

  get f() {
    return this.loginForm.controls;
  }

  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      if (this.loginForm.valid) {
        this.isLoading = true;
        this.auth.login(this.loginForm.getRawValue()).subscribe((result) => {
          this.user = this.auth.getUserInfo(result.token);
          if (result.success == true) {
            this.auth.storeToken(result.token);
            this.auth.setEmail(this.user.email);
            this.auth.setUserName(this.user.username);
            this.auth.setFirstName(this.user.firstname);
            this.toastr.success('Logged in successfully', 'Success!');
            this.router.navigate(['/home']);
          } else if (result.errorReason === 'Email has not been confirmed') {
            this.toastr.error(
              `${result.errorReason}, Check email for code`,
              'Error!'
            );
            this.router.navigate(['sign-up/confirm-email']);
          } else {
            this.toastr.error(result.errorReason, 'Error!');
          }
        });
      } else {
        this.toastr.error('Invalid credentials', 'Error!');
      }
    }
  }
}
