import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
  ) {}
  ngOnInit(): void {
    this.user = this.auth.getUserName();
    let id = this.route.snapshot.params['id'];
    this.invoiceId = this.route.snapshot.params['id'];
    this.auth.getInvoiceById(id).subscribe((invoice) => {this.currentInvoice = invoice;
    console.log(this.currentInvoice);
    })
      
  }
}
