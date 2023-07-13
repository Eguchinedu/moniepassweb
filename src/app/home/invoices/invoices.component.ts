import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css'],
})
export class InvoicesComponent implements OnInit {
  invoices!: any;
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
    this.auth.getEmail();
  }
  ngOnInit(): void {
    this.loadInvoices(this.auth.getUserName());
  }
  loadInvoices(data: any): void {
    this.auth.getInvoice(data).subscribe((invoice) => {
      this.invoices = invoice;
      console.log(this.invoices);
    });
  }
  viewInvoice(id: any): void {
    this.router.navigate(['/invoices', id]);
  }
}
