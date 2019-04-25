import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-buffet-master-dialog',
  templateUrl: './buffet-master-dialog.component.html',
  styleUrls: ['./buffet-master-dialog.component.scss']
})
export class BuffetMasterDialogComponent  {

  constructor(public dialogRef: MatDialogRef<BuffetMasterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    closeDialog(): void {
    this.dialogRef.close();
    }

}
