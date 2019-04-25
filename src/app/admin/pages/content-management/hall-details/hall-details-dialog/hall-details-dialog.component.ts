import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-hall-details-dialog',
  templateUrl: './hall-details-dialog.component.html',
  styleUrls: ['./hall-details-dialog.component.scss']
})
export class HallDetailsDialogComponent {

  constructor(public dialogRef: MatDialogRef<HallDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  closeDialog(): void {
  this.dialogRef.close();
  }
  
}
