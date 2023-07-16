import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { WithdrawInvoiceComponent } from '../../withdraw-invoice/withdraw-invoice.component';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.css'],
})
export class ViewInvoiceComponent {
  currentInvoice: any;
  invoiceId: string = '';
  user!: any;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.user = this.auth.getUserName();
    let id = this.route.snapshot.params['id'];
    this.invoiceId = this.route.snapshot.params['id'];
    this.auth.getInvoiceById(id).subscribe((invoice) => {
      this.currentInvoice = invoice;
    });
  }
  goback() {
    window.history.back();
  }
  withdrawInvoice(id: any, status: any) {
    const withdrawn = {
      invoiceId: id,
      status: 1,
    };
    return this.dialog
      .open(WithdrawInvoiceComponent, {
        width: '350px',
        hasBackdrop: true,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === true) {
          this.auth.withdrawInvoice(withdrawn).subscribe((result) => {
            if (result.success === true) {
              this.toastr.success('Invoice Withdrawn Successfully');
              location.reload(); // refresh the page
              this.ngOnInit();
            } else {
              this.toastr.error('Invoice Already Withdrawn');
            }
          });
        }
      });
  }
  makePayment() {
    this.auth.genOrder(this.currentInvoice).subscribe((result) => {
      if (result.success == true) {
        window.location.href = result.data.authorizationUrl;
      } else {
        this.toastr.error(result.errorReason, 'Error!');
      }
    });
  }
}
    