import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogData} from '../policy-dialog/policy-dialog.component';
export interface DialogData {
  content: string;
}
@Component({
  selector: 'app-chargeable-amenities-dialog',
  templateUrl: './chargeable-amenities-dialog.component.html',
  styleUrls: ['./chargeable-amenities-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChargeableAmenitiesDialogComponent {
  chargeableAmenitiesData;
  constructor(
    public dialogRef: MatDialogRef<ChargeableAmenitiesDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.chargeableAmenitiesData = data['content'];
  }

  close(): void {
    this.dialogRef.close();
  }

}
