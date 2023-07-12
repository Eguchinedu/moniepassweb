import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-generate-orders',
  templateUrl: './generate-orders.component.html',
  styleUrls: ['./generate-orders.component.css'],
})
export class GenerateOrdersComponent implements OnInit {
  constructor(private dialog: MatDialogRef<GenerateOrdersComponent>) {}
  ngOnInit(): void {}

  closeDialog(): void {
    this.dialog.close();
  }
}
