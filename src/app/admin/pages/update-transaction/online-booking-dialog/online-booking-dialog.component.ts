import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-online-booking-dialog',
  templateUrl: './online-booking-dialog.component.html',
  styleUrls: ['./online-booking-dialog.component.scss']
})
export class OnlineBookingDialogComponent {

  constructor(public dialogRef: MatDialogRef<OnlineBookingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  closeDialog(): void {
  this.dialogRef.close();
  }
}
