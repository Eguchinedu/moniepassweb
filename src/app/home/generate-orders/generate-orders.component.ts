import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService } from 'src/app/services/notifications.service';


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
  webDeviceId!: string;
  constructor(
    private dialog: MatDialogRef<GenerateOrdersComponent>,
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router,
    private notify: NotificationsService
  ) {
    this.orderForm = new FormGroup({
      invoiceId: new FormControl(''),
      merchantUsername: new FormControl(
        { value: this.auth.getUserName(), disabled: true },
        [Validators.required]
      ),
      customerUsername: new FormControl(null, [Validators.required]),
      customerPhone: new FormControl(null, [Validators.required]),
      customerAddress: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      narration: new FormControl(null),
      isMobileDevice: new FormControl(false),
    });
  }
  ngOnInit(): void {}

  closeDialog(): void {
    this.dialog.close();
  }
  checkCustomer(userName: any): void {
    this.auth.getClient(userName).subscribe((result) => {
      if (result) {
        this.customerUser = result;
        this.webDeviceId = this.customerUser.webDeviceId;
        if (this.auth.getUserName() === result.username) {
          this.orderForm.controls['customerUsername'].setValue(null);
          this.customerUser = null;
          this.toastr.error('You cannot make a payment to yourself');
        }
      } else {
        this.orderForm.controls['customerUsername'].setValue(null);
        this.customerUser = null;
        this.toastr.error('Customer not found');
      }
    });
  }
  calcServiceFee(amount: any): void {
    this.auth.getServiceFee(amount).subscribe((result) => {
      if (result) {
        this.serviceFee = result;
      } else {
        this.orderForm.controls['amount'].setValue(null);
        this.serviceFee = null;
        this.toastr.error('Amount not found');
      }
    });
  }
  sendNotification() {
    const data = {
      notification: {
        title: 'Order',
        body: 'New Payment from ' + this.auth.getUserName(),
      },
      to: this.webDeviceId,
    };
    console.log(data);
    this.notify.getNotification(data).subscribe((res) => {
      console.log(res);
      if (res.success > 0) {
        this.closeDialog();
      }
    });
  }
  onSubmit() {
    if (this.orderForm.valid) {
      this.auth.genOrder(this.orderForm.getRawValue()).subscribe((result) => {
        if (result.success == true) {
          this.toastr.success('Order generated Successfully', 'Success!');
          this.sendNotification();
          window.location.href = result.data.authorizationUrl;
        } else {
          this.toastr.error(result.errorReason, 'Error!');
        }
      });
    } else {
      this.toastr.error('Please Fill in details', 'Error!');
    }
  }
}
