import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cloudinary } from '@cloudinary/url-gen';
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
  Urls: string[] = [];
  uploadUrl!: string;
  isFilesUploaded: boolean = false;
  isLoading: boolean = false;
  constructor(
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.feedBackForm = new FormGroup({
      orderId: new FormControl(''),
      customerComplaintTitle: new FormControl(null),
      customerComplaintDescription: new FormControl(null),
      customerComplaintImages: new FormControl(this.uploadUrl),
    });
  }
  ngOnInit(): void {
    this.toastr.success('Please tell us what went wrong ☹️');
    this.feedBackForm.patchValue({
      orderId: this.route.snapshot.params['id'],
    });
    const cld = new Cloudinary({
      cloud: { cloudName: 'dpa8pui0l' },
    });
  }
  goback() {
    window.history.back();
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSubmit() {
    if (this.files.length === 0) {
      this.toastr.error('Please add images');
      return;
    }
    this.isLoading = true;
    for (let i = 0; i < this.files.length; i++) {
      const file_data = this.files[i];
      const data = new FormData();
      data.append('file', file_data);
      data.append('upload_preset', 'moniepassweb_feedback');
      data.append('cloud_name', 'dpa8pui0l');
      this.auth.uploadImages(data).subscribe((res) => {
        this.Urls.push(res.url);
        if (this.Urls.length === this.files.length) {
          this.feedBackForm.patchValue({
            customerComplaintImages: this.Urls.join(','),
          });
          if (this.feedBackForm.valid) {
            this.auth
              .postComplaint(this.feedBackForm.getRawValue())
              .subscribe((result) => {
                if (result.success === true) {
                  this.toastr.success('Complaint sent successfully 👍');
                  this.goback();
                } else {
                  this.toastr.error(result.errorReason);
                  this.isLoading = false;
                }
              });
          }
        }
      });
    }
  }
}
