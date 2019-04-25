import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-duration-dialog',
  templateUrl: './duration-dialog.component.html',
  styleUrls: ['./duration-dialog.component.scss']
})
export class DurationDialogComponent {

  constructor(public dialogRef: MatDialogRef<DurationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  closeDialog(): void {
  this.dialogRef.close();
  }

}
