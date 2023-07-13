import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { GenerateInvoiceComponent } from '../generate-invoice/generate-invoice.component';
import { GenerateOrdersComponent } from '../generate-orders/generate-orders.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  invoices!: any;
  orders!: any;
  user!: any;
  email!: any;
  constructor(
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {
    console.log(this.auth.getEmail());
    this.user = this.auth.getFirstName();
  }
  ngOnInit(): void {
    this.loadInvoices(this.auth.getUserName());
    this.loadOrders(this.auth.getUserName());
  }
  loadInvoices(data: any): void {
    this.auth.getInvoice(data).subscribe((invoice) => {
      this.invoices = invoice;
      console.log(this.invoices);
    });
  }
  loadOrders(data: any): void {
    this.auth.getOrders(data).subscribe((order) => {
      this.orders = order;
      console.log(this.orders);
    });
  }
  createInvoice(): void {
    this.dialog.open(GenerateInvoiceComponent, {
      width: '500px',
      hasBackdrop: true,
    });
  }
  createOrders(): void {
    this.dialog.open(GenerateOrdersComponent, {
      width: '500px',
      hasBackdrop: true,
    });
  }
  viewInvoice(id: any): void {
    this.router.navigate(['/invoices', id]);
  }
  viewOrder(id: any): void {
    this.router.navigate(['/orders', id]);
  }
}