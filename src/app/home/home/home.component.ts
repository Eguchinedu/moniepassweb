import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
invoices!: any;
orders!: any;
  constructor(private auth : AuthService, private router : Router) { 
    this.auth.getEmail()
  }
ngOnInit(): void {
  this.loadInvoices('eguchinedu18@gmail.com');
  this.loadOrders('eguchinedu18@gmail.com');

}
loadInvoices(data: any): void {
this.auth.getInvoice(data).subscribe((invoice) => {
  this.invoices = invoice
  console.log(this.invoices);
});
}
loadOrders(data: any): void {
this.auth.getOrders(data).subscribe((order) => {
  this.orders = order
  console.log(this.orders);
});
}
}
