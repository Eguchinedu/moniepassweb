import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
  files: any[] = [];
  feedBackForm: FormGroup;
  constructor(
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.feedBackForm = new FormGroup({
      orderId: new FormControl(''),
      customerComplaintTitle: new FormControl(null),
      customerComplaintDescription: new FormControl(null),
      customerComplaintImages: new FormControl(this.files),
    });
  }
  ngOnInit(): void {
    this.feedBackForm.patchValue({
      orderId: this.route.snapshot.params['id'],
    });
  }
  goback() {
    window.history.back();
  
  }

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  onSubmit() {
    console.log(this.feedBackForm.getRawValue());
    
  }
}
