import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-generate-invoice',
  templateUrl: './generate-invoice.component.html',
  styleUrls: ['./generate-invoice.component.css'],
})
export class GenerateInvoiceComponent implements OnInit {
  invoiceForm: FormGroup;
  customerUser!: any;
  customer!: true;

  constructor(
    private dialog: MatDialogRef<GenerateInvoiceComponent>,
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {
    this.invoiceForm = new FormGroup({
      merchantUsername: new FormControl(
        { value: 'eguchinedu18', disabled: true },
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
        this.invoiceForm.controls['customerUsername'].setValue(null);
        this.customerUser = null;
        this.toastr.error('Customer not found');
      }
    });
  }
  onSubmit() {
    if (this.invoiceForm.valid) {
      console.log(this.invoiceForm.getRawValue());
      this.closeDialog();
      this.toastr.success('Invoice Generated Successfully');

      // this.auth.addBank(this.invoiceForm.getRawValue())
      //   .subscribe((result) => {
      //     if (result.success == true) {
      //       this.toastr.success('Bank added successfully', 'Success!');
      // location.reload(); // refresh the page
      // this.ngOnInit();
      //     } else {
      //       this.toastr.error(result.errorReason, 'Error!');
      //     }
      //   });
    } else {
      this.toastr.error('Select Bank Please', 'Error!');
    }
  }
}
