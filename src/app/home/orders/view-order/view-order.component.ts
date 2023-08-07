import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmOrderCustomerComponent } from '../../confirm-order-customer/confirm-order-customer.component';
import Swal from 'sweetalert2';
import { ConfirmProductDeliveredComponent } from '../../confirm-product-delivered/confirm-product-delivered.component';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css'],
})
export class ViewOrderComponent {
  currentOrder: any;
  orderId: string = '';
  user!: any;
  errorMessage = '';
  src!: string;
  webDeviceId!: string;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router,
    private notify: NotificationsService
  ) {
    this.src = '../../../../assets/images/success.PNG';
  }
  ngOnInit(): void {
    this.user = this.auth.getUserName();
    let id = this.route.snapshot.params['id'];
    this.orderId = this.route.snapshot.params['id'];
    this.auth.getOrderById(id).subscribe((order) => {
      this.currentOrder = order;
      console.log(this.currentOrder);
      if (this.currentOrder.merchantUsername === this.user) {
        this.auth
          .getClient(this.currentOrder.customerUsername)
          .subscribe((result) => {
            this.webDeviceId = result.webDeviceId;
          });
      } else {
        this.auth
          .getClient(this.currentOrder.merchantUsername)
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

  complaint(id: any) {
    this.router.navigate([`/orders/${this.orderId}/complaints/${id}`]);
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

  productDelivered(id: any, status: any) {
    const data = {
      notification: {
        title: 'Order',
        body: `Your Order with ID:${this.orderId} has arrived`,
      },
      to: this.webDeviceId,
    };
    const confirm = {
      orderId: id,
      status: 2,
    };
    return this.dialog
      .open(ConfirmProductDeliveredComponent, {
        width: '350px',
        hasBackdrop: true,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === true) {
          this.auth.confirmDeliveryMerchant(confirm).subscribe((result) => {
            if (result.success === true) {
              this.toastr.success('Product Delivered Successfully');
              this.sendNotification(data);
            } else {
              this.toastr.error(result.errorReason);
            }
          });
        }
      });
  }
  productFeedback(id: any, status: any) {
    const confirm1 = {
      orderId: id,
      status: 8,
    };
    const confirm2 = {
      orderId: id,
      status: 3,
    };
    const confirm3 = {
      orderId: id,
      status: 3,
    };
    const data = {
      notification: {
        title: 'Order',
        body: `Order with ID:${this.orderId} was Received with no complaints`,
      },
      to: this.webDeviceId,
    };
    const data2 = {
      notification: {
        title: 'Complaint',
        body: `A complaint was made on Order with ID:${this.orderId}`,
      },
      to: this.webDeviceId,
    };
    return this.dialog
      .open(ConfirmOrderCustomerComponent, {
        width: '450px',
        hasBackdrop: true,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 0) {
          this.auth.confirmDeliveryMerchant(confirm1).subscribe((result) => {
            this.toastr.success('Feedback Sent');
            if (result.success === true) {
              Swal.fire({
                title: 'Submitted',
                html: 'Thanks for Ordering!',
                imageUrl: this.src,
                imageWidth: 150,
                imageHeight: 150,
                confirmButtonText: `Done`,
              });
              this.sendNotification(data);
            } else {
              this.toastr.error(result.errorReason);
            }
          });
        } else if (result === 1) {
          this.sendNotification(data2);
          this.router.navigate([`/orders/${id}/feedback`]);
        } else if (result === 2) {
          this.sendNotification(data2);
          this.router.navigate([`/orders/${id}/feedback`]);
        }
      });
  }
}
