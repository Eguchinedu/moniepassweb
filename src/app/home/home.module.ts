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



@NgModule({
  declarations: [
    HomeComponent,
    InvoicesComponent,
    OrdersComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'home/profile', component: ProfileComponent, canActivate: [AuthGuard] },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'invoices',
        component: InvoicesComponent,
        canActivate: [AuthGuard],
      },
    ]),
  ],
})
export class HomeModule {}
