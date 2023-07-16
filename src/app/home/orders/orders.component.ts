import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders!: any;
  userName!: any;
  constructor(private auth: AuthService, private router: Router) {
    this.auth.getEmail();
    this.userName = this.auth.getUserName();
  }
  ngOnInit(): void {
    this.loadOrders(this.auth.getUserName());
  }

  loadOrders(data: any): void {
    this.auth.getOrders(data).subscribe((order) => {
      this.orders = order;
    });
  }
  viewOrder(id: any): void {
    this.router.navigate(['/orders', id]);
  }
}
