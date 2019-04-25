import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';

@Component({
  selector: 'app-venue-details-dialog',
  templateUrl: './venue-details-dialog.component.html',
  styleUrls: ['./venue-details-dialog.component.scss']
})
export class VenueDetailsDialogComponent {

  constructor(public dialogRef: MatDialogRef<VenueDetailsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
