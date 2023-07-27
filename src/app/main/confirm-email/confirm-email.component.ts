import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    });
  }
  ngOnInit() {
    this.email = this.auth.getEmail();
  }

  get f() {
    return this.confirmForm.controls;
  }

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
