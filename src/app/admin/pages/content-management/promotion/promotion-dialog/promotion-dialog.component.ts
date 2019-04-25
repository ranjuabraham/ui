import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-promotion-dialog',
  templateUrl: './promotion-dialog.component.html',
  styleUrls: ['./promotion-dialog.component.scss']
})
export class PromotionDialogComponent {

  constructor(public dialogRef: MatDialogRef<PromotionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  closeDialog(): void {
  this.dialogRef.close();
  }
  
}

