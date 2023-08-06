import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseMessagingService {
  message: any = null;

  constructor(private toastr: ToastrService, private auth: AuthService) {}
  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: environment.firebase.vapidKey })
      .then((currentToken) => {
        if (currentToken) {
          // console.log('Hurraaa!!! we got the token.....');
          // console.log(currentToken);
          this.auth.storeWebDeviceId(currentToken);
          const data = {
            username: this.auth.getUserName(),
            webDeviceId: currentToken,
            isMobileDevice: false,
            mobileDeviceId: '',
          };
          this.auth.addWebId(data).subscribe(res => {
            res
          })
        } else {
          console.log(
            'No registration token available. Request permission to generate one.'
          );
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message = payload;
      this.toastr.success(
        this.message.notification.body,
        this.message.notification.title
      );
    });
  }
}
