import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ILogin } from '../types/login';
import { ISignUp } from '../types/sign-up';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  baseUrl = 'https://api.moniepass.com/api/v1/';

  login(data: ILogin): Observable<any> {
    return this.http.post(this.baseUrl + 'auth/login', data);
  }
  signUp(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'auth/signup', data);
  }
  confirmEmail(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'auth/confirm-email', data);
  }
  forgotPass(data: any): Observable<any> {
    return this.http.post(
      `https://api.moniepass.com/api/v1/auth/send-code?email=${data.email}`,
      data
    );
  }
  confirmPass(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'auth/reset-password', data);
  }
  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }
  setEmail(email: string) {
    return localStorage.setItem('email', email);
  }
  getEmail() {
    return localStorage.getItem('email');
  }
  isLoggedIn() {
    return this.getToken() ? true : false;
  }
  clear() {
    localStorage.clear();
  }
  signOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.toastr.success('Logged out', 'Bye!');
  }
}
