import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  
  notifyUrl = environment.notifyUrl;
  constructor(private http: HttpClient) {}
  getNotification(data: any): Observable<any> {
    return this.http.post(this.notifyUrl, data);
  }
}
