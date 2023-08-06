import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getMessaging, onMessage } from 'firebase/messaging';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent {
  isMenuRequired = false;
  messageArray: any[] = [
    {notification : {
      title: 'Invoice',
      body: 'You have a new invoice from Zeus_Egu',
    }},
    {notification : {
      title: 'Order',
      body: 'You have a new order from Zeus_Egu',
    }},
    {notification : {
      title: 'Complaint',
      body: 'there was a complaint from Zeus_Egu',
    }}
  ];
  message: any;
  time: any = new Date();
  count = 0;
  constructor(
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.updateCount();
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }
  signOut() {
    this.auth.signOut();
  }
  resetCount() {
    this.count = 0;
  }
  updateCount() {
    console.log('heyy');
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      console.log(payload);
      this.message = payload;
      this.toastr.success(
        this.message.notification.body,
        this.message.notification.title
      );
      this.messageArray.push(payload);
      console.log(this.messageArray);
      this.count++;
    });
  }
}
