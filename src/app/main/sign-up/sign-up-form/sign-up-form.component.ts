import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css'],
})
export class SignUpFormComponent {
  visible: boolean = true;
  changeType: boolean = true;
  visible2: boolean = true;
  changeType2: boolean = true;
  postError = false;
  postErrorMessage = '';

  signUpForm: FormGroup;

  constructor(
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {
    this.signUpForm = new FormGroup(
      {
        firstName: new FormControl(null, [Validators.required]),
        lastName: new FormControl(null, [Validators.required]),
        username: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl(null, [Validators.required]),
      },
      {
        validators: this.MustMatch,
      }
    );
  }
  ngOnInit() {
   
  }
  viewPass() {
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }
  viewPass2() {
    this.visible2 = !this.visible2;
    this.changeType2 = !this.changeType2;
  }
  get f() {
    return this.signUpForm.controls;
  }
  MustMatch: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    let password = control.get('password');
    let confirmPassword = control.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password?.value !== confirmPassword?.value
    ) {
      return { passwordmatcherror: true };
    }
    return null;
  };

  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

  onSubmit() {
      if (this.signUpForm.valid) {
         const user = this.signUpForm.getRawValue();
      this.auth.signUp(this.signUpForm.getRawValue()).subscribe((result) => {
        if (result.success == true) {
          console.log(result);
          this.toastr.success('Account Created Successfully, Kindly confirm email', 'Success!');
          this.auth.setEmail(user.email);
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
