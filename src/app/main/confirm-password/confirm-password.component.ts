import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.css'],
})
export class ConfirmPasswordComponent {
  visible: boolean = true;
  changeType: boolean = true;
  visible2: boolean = true;
  changeType2: boolean = true;
  isLoading: boolean = false;
  postError = false;
  postErrorMessage = '';
  email!: string | null;
  confirmPassForm: FormGroup;

  constructor(
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {
    this.email = this.auth.getEmail();
    this.confirmPassForm = new FormGroup(
      {
        email: new FormControl({ value: this.email, disabled: true }, [
          Validators.required,
          Validators.email,
        ]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl(null, [Validators.required]),
        code: new FormControl(null, [Validators.required]),
      },
      {
        validators: this.MustMatch,
      }
    );
  }
  ngOnInit() {}
  viewPass() {
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }
  viewPass2() {
    this.visible2 = !this.visible2;
    this.changeType2 = !this.changeType2;
  }
  get f() {
    return this.confirmPassForm.controls;
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
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

  onSubmit() {
    if (this.confirmPassForm.valid) {
        this.isLoading = true;
      this.auth
        .confirmPass(this.confirmPassForm.getRawValue())
        .subscribe((result) => {
          if (result.success == true) {
            this.toastr.success('Password updated successfully', 'Success!');
            this.auth.clear();
            this.router.navigate(['/login']);
          } else {
            this.toastr.error(result.errorReason, 'Error!');
          }
        });
    } else {
      this.toastr.error('Invalid credentials', 'Error!');
    }
  }
}
