import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';



@Component({
  selector: 'app-cost-mapping-dialog',
  templateUrl: './cost-mapping-dialog.component.html',
  styleUrls: ['./cost-mapping-dialog.component.scss']
})
export class CostMappingDialogComponent {

 
  constructor(public dialogRef: MatDialogRef<CostMappingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  closeDialog(): void {
  this.dialogRef.close();
  }
}
