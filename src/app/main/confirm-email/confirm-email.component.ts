import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css'],
})
export class ConfirmEmailComponent {
  postError = false;
  visible: boolean = true;
  changeType: boolean = true;
  visible2: boolean = true;
  changeType2: boolean = true;
  postErrorMessage = '';
  email!: string | null;
  isLoading: boolean = false;
  confirmForm: FormGroup;

  constructor(
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {
    this.email = this.auth.getEmail();
    this.confirmForm = new FormGroup({
      email: new FormControl({ value: this.email, disabled: true }, [
        Validators.required,
        Validators.email,
      ]),
      code: new FormControl(null, [Validators.required]),
       password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl(null, [Validators.required]),
      },
      {
        validators: this.MustMatch,
      
    });
  }

  ngOnInit() {
    this.email = this.auth.getEmail();
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
    return this.confirmForm.controls;
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
    if (this.confirmForm.valid) {
      this.isLoading = true;
      this.auth
        .confirmEmail(this.confirmForm.getRawValue())
        .subscribe((result) => {
          if (result.success == true) {
            this.toastr.success('Email Confirmed successfully', 'Success!');
            this.auth.clear();
            this.router.navigate(['/login']);
          } else {
            this.toastr.error(result.errorReason, 'Error!');
            this.isLoading = false;
          }
        });
    } else {
      this.toastr.error('Invalid credentials', 'Error!');
    }
  }
}
