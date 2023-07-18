import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { WithdrawInvoiceComponent } from '../withdraw-invoice/withdraw-invoice.component';

@Component({
  selector: 'app-confirm-product-delivered',
  templateUrl: './confirm-product-delivered.component.html',
  styleUrls: ['./confirm-product-delivered.component.css'],
})
export class ConfirmProductDeliveredComponent {
  constructor(
    public dialogRef: MatDialogRef<WithdrawInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private auth: AuthService,
    private toastr: ToastrService
  ) {}
  closeDialog() {
    this.dialogRef.close(false);
  }
}
