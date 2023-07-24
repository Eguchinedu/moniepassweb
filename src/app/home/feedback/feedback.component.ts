import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent {
  feedBackForm: FormGroup;
  constructor(
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {this.feedBackForm = new FormGroup({
    orderId: new FormControl(''),
    customerComplaintTitle: new FormControl(null),
    customerComplaintDescription: new FormControl(null),
    customerComplaintImages: new FormControl(null),
  });}
  goback() {
    window.history.back();
  }
  onSubmit() {}
}
