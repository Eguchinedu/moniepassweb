import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { MatTabsModule } from '@angular/material/tabs';
import { GenerateInvoiceComponent } from './generate-invoice/generate-invoice.component';
import { GenerateOrdersComponent } from './generate-orders/generate-orders.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ViewInvoiceComponent } from './invoices/view-invoice/view-invoice.component';
import { WithdrawInvoiceComponent } from './withdraw-invoice/withdraw-invoice.component';
import { ViewOrderComponent } from './orders/view-order/view-order.component';
import { ConfirmOrderCustomerComponent } from './confirm-order-customer/confirm-order-customer.component';



@NgModule({
  declarations: [
    HomeComponent,
    InvoicesComponent,
    OrdersComponent,
    ProfileComponent,
    GenerateInvoiceComponent,
    GenerateOrdersComponent,
    ViewInvoiceComponent,
    WithdrawInvoiceComponent,
    ViewOrderComponent,
    ConfirmOrderCustomerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      {
        path: 'home/profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'orders/:id',
        component: ViewOrderComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'invoices',
        component: InvoicesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'invoices/:id',
        component: ViewInvoiceComponent,
        canActivate: [AuthGuard],
      },
    ]),
  ],
  entryComponents: [GenerateInvoiceComponent, GenerateOrdersComponent, WithdrawInvoiceComponent, ConfirmOrderCustomerComponent],
})
export class HomeModule {}
