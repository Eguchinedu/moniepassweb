import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-generate-orders',
  templateUrl: './generate-orders.component.html',
  styleUrls: ['./generate-orders.component.css'],
})
export class GenerateOrdersComponent implements OnInit {
  orderForm: FormGroup;
  customerUser!: any;
  customer!: true;
  serviceFee!: any;

  constructor(
    private dialog: MatDialogRef<GenerateOrdersComponent>,
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {
    this.orderForm = new FormGroup({
      invoiceId: new FormControl({
        value: '' ,
        disabled: true,
      }),
      merchantUsername: new FormControl(
        { value: this.auth.getUserName(), disabled: true },
        [Validators.required]
      ),
      customerUsername: new FormControl(null, [Validators.required]),
      customerPhone: new FormControl(null, [Validators.required]),
      customerAddress: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      narration: new FormControl(null),
    });
  }
  ngOnInit(): void {}

  closeDialog(): void {
    this.dialog.close();
  }
  checkCustomer(userName: any): void {
    console.log(userName);
    this.auth.getClient(userName).subscribe((result) => {
      if (result) {
        this.customerUser = result;
        console.log(this.customerUser);
      } else {
        this.orderForm.controls['customerUsername'].setValue(null);
        this.customerUser = null;
        this.toastr.error('Customer not found');
      }
    });
  }
  calcServiceFee(amount: any): void {
    console.log(amount);
    this.auth.getServiceFee(amount).subscribe((result) => {
      if (result) {
        this.serviceFee = result;
        console.log(this.serviceFee);
      } else {
        this.orderForm.controls['amount'].setValue(null);
        this.serviceFee = null;
        this.toastr.error('Amount not found');
      }
    });
  }
  onSubmit() {
    if (this.orderForm.valid) {
      console.log(this.orderForm.getRawValue());
      this.auth.genOrder(this.orderForm.getRawValue())
      .subscribe((result) => {
        if (result.success == true) {
          this.toastr.success('Order generated Successfully', 'Success!');
          this.closeDialog();
          window.location.href = result.data.authorizationUrl;
      // location.reload(); // refresh the page
      // this.ngOnInit();
          } else {
            this.toastr.error(result.errorReason, 'Error!');
          }
        });
    } else {
      this.toastr.error('Please Fill in details', 'Error!');
    }
  }
}
