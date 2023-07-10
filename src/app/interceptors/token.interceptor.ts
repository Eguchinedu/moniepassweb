import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
     const myToken = this.auth.getToken();


    if (myToken) {
      const cloned = request.clone({
        headers: request.headers.set("Authorization",
          "Bearer " + myToken)
      });

      return next.handle(cloned);
    }
    return next.handle(request);
  }
}
