import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-view-complaint',
  templateUrl: './view-complaint.component.html',
  styleUrls: ['./view-complaint.component.css'],
})
export class ViewComplaintComponent {
  feedBack: any;
  complaintId: string = '';
  user!: any;
  errorMessage = '';
  imageSrc!: string[];
  orderId!: string;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.user = this.auth.getUserName();
    let id = this.route.snapshot.params['id2'];
    this.complaintId = this.route.snapshot.params['id2'];
    this.orderId = this.route.snapshot.params['id'];
    this.auth.getComplaintById(id).subscribe((order: any) => {
      this.feedBack = order;
      console.log(this.feedBack);
      this.imageSrc = this.feedBack.customerComplaintImages.split(',');

      console.log(this.imageSrc);
    });
  }
  goback() {
    window.history.back();
  }
  fileComplaint(id: string){
    this.router.navigate([`/orders/${this.orderId}/feedback`]);
  }
}
