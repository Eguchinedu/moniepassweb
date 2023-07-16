import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  postError = false;
  postErrorMessage = '';
  tab1 = false;
  tab2 = false;
  tab3 = false;
  status1 = false;
  status2 = false;
  status3 = false;
  visible: boolean = true;
  changeType: boolean = true;
  visible2: boolean = true;
  changeType2: boolean = true;
  bankList!: any[];
  bankForm: FormGroup;
  changePassForm: FormGroup;
  user!: any;

  constructor(
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {
    this.bankForm = new FormGroup({
      username: new FormControl({ value: this.auth.getUserName(), disabled: true }, [
        Validators.required,
      ]),
      bankCode: new FormControl(null, [Validators.required]),
      accountNumber: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    });
    this.changePassForm = new FormGroup(
      {
        email: new FormControl(
          { value: this.auth.getEmail(), disabled: true },
          [Validators.required, Validators.email]
        ),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
        ]),
        newPassword: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
        ]),

      }
   
    );
  }
  ngOnInit() {
    this.getBanks();
    this.getUserDetails()
  }
  getBanks() {
    this.auth.getBankList().subscribe((res) => {
      this.bankList = res;
    });
  }
  getUserDetails(){
    this.auth.getClient(this.auth.getUserName()).subscribe((res)=>{
      this.user=res;
    })
  }
  viewPass() {
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }
  viewPass2() {
    this.visible2 = !this.visible2;
    this.changeType2 = !this.changeType2;
  }
  setActive1() {
    this.tab1 = !this.tab1;
    this.tab2 = false;
    this.tab3 = false;
    this.status1 = !this.status1;
    this.status2 = false;
    this.status3 = false;
  }
  setActive2() {
    this.tab2 = !this.tab2;
    this.status2 = !this.status2;
    this.tab1 = false;
    this.tab3 = false;
    this.status1 = false;
    this.status3 = false;
  }
  setActive3() {
    this.tab3 = !this.tab3;
    this.status3 = !this.status3;
    this.tab1 = false;
    this.tab2 = false;
    this.status2 = false;
    this.status1 = false;
  }


  get f() {
    return this.bankForm.controls;
  }

  onHttpError(errorResponse: any) {
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

  onSubmitBankForm() {
    if (this.bankForm.valid) {
      this.auth.addBank(this.bankForm.getRawValue())
        .subscribe((result) => {
          if (result.success == true) {
            this.toastr.success('Bank added successfully', 'Success!');
      location.reload(); // refresh the page
      this.ngOnInit();
          } else {
            this.toastr.error(result.errorReason, 'Error!');
          }
        });
    } else {
      this.toastr.error('Select Bank Please', 'Error!');
    }
  }
  onSubmitChangePassForm() {
    if (this.changePassForm.valid) {
      this.auth
        .changePass(this.changePassForm.getRawValue())
        .subscribe((result) => {
          if (result.success == true) {
            this.toastr.success('Password Changed successfully', 'Success!');
            location.reload(); // refresh the page
            this.ngOnInit();
          } else {
            this.toastr.error(result.errorReason, 'Error!');
          }
        });
    } else {
      this.toastr.error('Select Bank Please', 'Error!');
    }
  }
}
