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

  // AUTHENTICATION SECTION
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
  changePass(data: string): Observable<any> {
    return this.http.post(this.baseUrl + `auth/change-password`, data);
  }
  confirmPass(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'auth/reset-password', data);
  }

  // USER SECTION
  getClient(data: any): Observable<any> {
    return this.http.get(this.baseUrl + `client/username/${data}`);
  }

  //INVOICES----------
  genInvoice(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'invoice', data);
  }
  getInvoice(data: any): Observable<any> {
    return this.http.get(this.baseUrl + `invoice/username/${data}`);
  }
  getInvoiceById(data: any): Observable<any> {
    return this.http.get(this.baseUrl + `invoice/invoiceid/${data}`);
  }
  withdrawInvoice(data: any): Observable<any> {
    return this.http.put(this.baseUrl + `invoice`, data);
  }

  ///
  //ORDERS--------------
  genOrder(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'invoice/make-payment', data);
  }
  getOrders(data: any): Observable<any> {
    return this.http.get(this.baseUrl + `order/username/${data}`);
  }
  getOrderById(data: any): Observable<any> {
    return this.http.get(this.baseUrl + `order/orderid/${data}`);
  }
  confirmDeliveryMerchant(data: any): Observable<any> {
return this.http.put(this.baseUrl +  'order', data)
  }

  //BANKS AND PAYMENT----------------
  addBank(data: any): Observable<any> {
    return this.http.post(
      this.baseUrl + 'client/add-bank-account-details',
      data
    );
  }
  getBankList(): Observable<any> {
    return this.http.get(this.baseUrl + 'paystack/banks');
  }
  getServiceFee(data: any): Observable<any> {
    return this.http.get(this.baseUrl + `invoice/get-service-fee/${data}`);
  }
  verifyPayment(data: any): Observable<any> {
    return this.http.get(this.baseUrl + 'paystack/verify-payment', data);
  }

  // TOKEN SECTION AND STORAGE----------

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }
  getUserInfo(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
  setEmail(email: string) {
    return localStorage.setItem('email', email);
  }
  getEmail() {
    return localStorage.getItem('email');
  }
  setUserName(username: string) {
    return localStorage.setItem('username', username);
  }
  getUserName() {
    return localStorage.getItem('username');
  }
  setFirstName(firstname: string) {
    return localStorage.setItem('firstname', firstname);
  }
  getFirstName() {
    return localStorage.getItem('firstname');
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
