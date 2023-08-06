import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();
    const myToken2 =
      'AAAAE4G0Ajo:APA91bEMqOZDwx9QE3qlkYWexTMTSWooKvCaWzFdBxAgLi1jjBtKlZXcp1Qxfzez4MfdUl3rWp6_E0vlBPKBBrUNvFQD-S02YHsg_OYno25WhJwFmAOhzXMcEDLK2ZlC0zj7TPV6wQH5';

    if (this.isHeaderNeeded(request.url) && myToken) {
      if (request.url === environment.notifyUrl) {
        const cloned = request.clone({
          headers: request.headers.set('Authorization', 'Bearer ' + myToken2),
        });
        return next.handle(cloned);
      } else {
        const cloned = request.clone({
          headers: request.headers.set('Authorization', 'Bearer ' + myToken),
        });
        return next.handle(cloned);
      }
    }
    return next.handle(request);
  }
  //   if (this.isHeaderNeeded(request.url) && myToken) {
  //     const cloned = request.clone({
  //       headers: request.headers.set('Authorization', 'Bearer ' + myToken),
  //     });
  //     return next.handle(cloned);
  //   }
  //   return next.handle(request);
  // }

  isHeaderNeeded(url: string) {
    if (url === environment.uploadUrl) {
      // this condition is up to you, it could be an exact match or how ever you like
      return false;
    } else {
      return true;
    }
  }
}
