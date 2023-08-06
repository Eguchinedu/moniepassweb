import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ILogin } from '../types/login';
import { ISignUp } from '../types/sign-up';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  

  // AUTHENTICATION SECTION
  login(data: ILogin): Observable<any> {
    return this.http.post(environment.baseUrl + 'auth/login', data);
  }
  signUp(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + 'auth/signup', data);
  }
  confirmEmail(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + 'auth/confirm-email', data);
  }
  forgotPass(data: any): Observable<any> {
    return this.http.post(
      `https://api.moniepass.com/api/v1/auth/send-code?email=${data.email}`,
      data
    );
  }
  changePass(data: string): Observable<any> {
    return this.http.post(environment.baseUrl + `auth/change-password`, data);
  }
  confirmPass(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + 'auth/reset-password', data);
  }

  // USER SECTION
  getClient(data: any): Observable<any> {
    return this.http.get(environment.baseUrl + `client/username/${data}`);
  }
  //USER FEEDBACK SECTION
  uploadImages(data: any): Observable<any> {
    return this.http.post(
      environment.uploadUrl,
      data
    )
  }
  postComplaint(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + 'order/add-complaint', data);
  }
  getComplaintById(data: any): Observable<any> {
    return this.http.get(environment.baseUrl + `complaint/complaintid/${data}`);
  }

  //INVOICES----------
  genInvoice(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + 'invoice', data);
  }
  getInvoice(data: any): Observable<any> {
    return this.http.get(environment.baseUrl + `invoice/username/${data}`);
  }
  getInvoiceById(data: any): Observable<any> {
    return this.http.get(environment.baseUrl + `invoice/invoiceid/${data}`);
  }
  withdrawInvoice(data: any): Observable<any> {
    return this.http.put(environment.baseUrl + `invoice`, data);
  }

  ///
  //ORDERS--------------
  genOrder(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + 'invoice/make-payment', data);
  }
  getOrders(data: any): Observable<any> {
    return this.http.get(environment.baseUrl + `order/username/${data}`);
  }
  getOrderById(data: any): Observable<any> {
    return this.http.get(environment.baseUrl + `order/orderid/${data}`);
  }
  confirmDeliveryMerchant(data: any): Observable<any> {
return this.http.put(environment.baseUrl +  'order', data)
  }

  //BANKS AND PAYMENT----------------
  addBank(data: any): Observable<any> {
    return this.http.post(
      environment.baseUrl + 'client/add-bank-account-details',
      data
    );
  }
  getBankList(): Observable<any> {
    return this.http.get(environment.baseUrl + 'paystack/banks');
  }
  getServiceFee(data: any): Observable<any> {
    return this.http.get(environment.baseUrl + `invoice/get-service-fee/${data}`);
  }
  verifyPayment(data: any): Observable<any> {
    return this.http.get(environment.baseUrl + 'paystack/verify-payment', data);
  }

  // TOKEN SECTION AND STORAGE----------
  addWebId(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + 'Client/update-device-id', data);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }
  storeWebDeviceId(webDeviceId: string) {
    localStorage.setItem('webDeviceId', webDeviceId);
  }

  getWebDeviceId() {
    return localStorage.getItem('webDeviceId');
  }
  storeCustomerWebDeviceId(webDeviceId: string) {
    localStorage.setItem('customerWebDeviceId', webDeviceId);
  }

  getCustomerWebDeviceId() {
    return localStorage.getItem('customerWebDeviceId');
  }

  getUserInfo(token: string) {
    if(token){
      return JSON.parse(atob(token.split('.')[1]));
    }
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
