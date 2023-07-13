import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

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
    this.src = '/assets/images/success.PNG';
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

  
}
