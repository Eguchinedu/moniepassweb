import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generate-invoice',
  templateUrl: './generate-invoice.component.html',
  styleUrls: ['./generate-invoice.component.css'],
})
export class GenerateInvoiceComponent implements OnInit {
  invoiceForm: FormGroup;
  customerUser!: any;
  merchant!: any;
  src!: string;

  constructor(
    private dialog: MatDialogRef<GenerateInvoiceComponent>,
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {
    this.src = '/assets/images/success.PNG';
    this.invoiceForm = new FormGroup({
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
  ngOnInit(): void {
    this.getUserDetails();
  }

  closeDialog(): void {
    this.dialog.close();
  }
  checkCustomer(userName: any): void {
    this.auth.getClient(userName).subscribe((result) => {
      if (result) {
        this.customerUser = result;
      } else {
        this.invoiceForm.controls['customerUsername'].setValue(null);
        this.customerUser = null;
        this.toastr.error('Customer not found');
      }
    });
  }
  getUserDetails() {
    this.auth.getClient(this.auth.getUserName()).subscribe((res) => {
      this.merchant = res;
      if(this.merchant.accountNumber === null && this.merchant.bankName === null){
        this.toastr.error('Please add your Bank Details in the Profile Page before generating payment', 'Error!');
        this.closeDialog();
      }
    });
  }

  onSubmit() {
    if (this.invoiceForm.valid) {
      this.auth
        .genInvoice(this.invoiceForm.getRawValue())
        .subscribe((result) => {
          if (result.success == true) {
            this.toastr.success('Invoice Generated Successfully', 'Success!');
            this.closeDialog();
            location.reload(); // refresh the page
            this.ngOnInit();
            
          } else {
            this.toastr.error(result.errorReason, 'Error!');
          }
        });
    } else {
      this.toastr.error('Please Fill In Details', 'Error!');
    }
  }
}
