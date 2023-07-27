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
      // if(this.user === this.currentOrder.merchantUsername && this.currentOrder.complaintId !== null ) {
      //   this.toastr.error('You have a complaint on this order');
      // }
    });
    
    


  }
  goback() {
    window.history.back();
  }

  complaint(id: any){
    this.router.navigate([`/orders/${this.orderId}/complaints/${id}`]);
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
  productFeedback(id: any, status: any) {
    const confirm1 = {
      orderId: id,
      status: 8,
    };
    const confirm2 = {
      orderId: id,
      status: 3,
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
    })
  } 
  else if(result === 1){
    this.auth.confirmDeliveryMerchant(confirm2).subscribe((result) => {
      console.log(result);
      if (result.success === true) {
          this.router.navigate([`/orders/${id}/feedback`]);
        } else {
          this.toastr.error(result.errorReason);
        }
      });
    }
  else if(result === 2){
    this.auth.confirmDeliveryMerchant(confirm2).subscribe((result) => {
      console.log(result);
      if (result.success === true) {
          this.router.navigate([`/orders/${id}/feedback`]);
        } else {
          this.toastr.error(result.errorReason);
        }
      });
    }
  });
  }
}
