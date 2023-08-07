import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { WithdrawInvoiceComponent } from '../../withdraw-invoice/withdraw-invoice.component';
import { NotificationsService } from 'src/app/services/notifications.service';

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
  webDeviceId!: string;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router,
    private notify: NotificationsService
  ) {}
  ngOnInit(): void {
    this.user = this.auth.getUserName();
    let id = this.route.snapshot.params['id'];
    this.invoiceId = this.route.snapshot.params['id'];
    this.auth.getInvoiceById(id).subscribe((invoice) => {
      this.currentInvoice = invoice;
      console.log(this.currentInvoice);
      if (this.currentInvoice.merchantUsername === this.user) {
        this.auth
          .getClient(this.currentInvoice.customerUsername)
          .subscribe((result) => {
            this.webDeviceId = result.webDeviceId;
          });
      } else {
        this.auth
          .getClient(this.currentInvoice.merchantUsername)
          .subscribe((result) => {
            this.webDeviceId = result.webDeviceId;
            console.log(this.webDeviceId);
          });
      }
    });
  }
  goback() {
    window.history.back();
  }
  sendNotification(data: any) {
    this.notify.getNotification(data).subscribe((res) => {
      console.log(res);
      if (res.success > 0) {
        location.reload(); // refresh the page
        this.ngOnInit();
      }
    });
  }
  withdrawInvoice(id: any, status: any) {
        const data = {
          notification: {
            title: 'Invoice',
            body: `Invoice with ID:${this.invoiceId} was withdrawn by merchant`,
          },
          to: this.webDeviceId,
        };
    const withdrawn = {
      invoiceId: id,
      status: 2,
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
              this.sendNotification(data);
            } else {
              this.toastr.error('Invoice Already Withdrawn');
            }
          });
        }
      });
  }
  makePayment() {
            const data = {
              notification: {
                title: 'Invoice',
                body: `Payment has been made to Invoice with ID:${this.invoiceId}`,
              },
              to: this.webDeviceId,
            };
    this.auth.genOrder(this.currentInvoice).subscribe((result) => {
      this.sendNotification(data);
      if (result.success == true) {
        window.location.href = result.data.authorizationUrl;
      } else {
        this.toastr.error(result.errorReason, 'Error!');
      }
    });
  }
}
    