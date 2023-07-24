import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmOrderCustomerComponent } from '../../confirm-order-customer/confirm-order-customer.component';
import Swal from 'sweetalert2';
import { ConfirmProductDeliveredComponent } from '../../confirm-product-delivered/confirm-product-delivered.component';

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

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router
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
    });
    


  }
  goback() {
    window.history.back();
  }

  productDelivered(id: any, status: any) {
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
        location.reload(); // refresh the page
        this.ngOnInit();
      } else {
        this.toastr.error(result.errorReason);
      }
    })}});
  }
  productReceived(id: any, status: any) {
    const confirm = {
      orderId: id,
      status: 8,
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
    this.auth.confirmDeliveryMerchant(confirm).subscribe((result) => {
      console.log(result);
      this.toastr.success('Feedback Sent');
      if (result.success === true) {
        Swal.fire({
           title: 'Submitted',
           html: 'Thanks for Ordering!',
           imageUrl: this.src,
           imageWidth: 150,
           imageHeight: 150,
           confirmButtonText: `Done`,
         })
        location.reload(); // refresh the page
        this.ngOnInit();
      } else {
        this.toastr.error(result.errorReason);
      }
    })} else if(result === 1){
      this.router.navigate([`/orders/${id}/feedback`]);
    }
  });
  }
}
