import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-withdraw-invoice',
  templateUrl: './withdraw-invoice.component.html',
  styleUrls: ['./withdraw-invoice.component.css'],
})
export class WithdrawInvoiceComponent {
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
