import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirm-order-customer',
  templateUrl: './confirm-order-customer.component.html',
  styleUrls: ['./confirm-order-customer.component.css'],
})
export class ConfirmOrderCustomerComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmOrderCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private auth: AuthService,
    private toastr: ToastrService
  ) {}
  closeDialog() {
    this.dialogRef.close(false);
  }
}
