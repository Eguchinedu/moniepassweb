import { Component, OnInit } from '@angular/core';
import {Cloudinary} from '@cloudinary/url-gen';

import { NotificationsService } from './services/notifications.service';
import { ToastrService } from 'ngx-toastr';
import { FirebaseMessagingService } from './services/firebase-messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'moniepassweb';

  constructor(
    ) {}
  ngOnInit(): void {
    const cld = new Cloudinary({ cloud: { cloudName: 'dpa8pui0l' } });

  }


}
