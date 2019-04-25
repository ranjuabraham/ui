import {Component, OnInit, Inject, ViewEncapsulation} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  content: string;
}
@Component({
  selector: 'app-policy-dialog',
  templateUrl: './policy-dialog.component.html',
  styleUrls: ['./policy-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PolicyDialogComponent {
  termsAndConditionsData;
  constructor(
    public dialogRef: MatDialogRef<PolicyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.termsAndConditionsData = data['content'];
  }

  close(): void {
    this.dialogRef.close();
  }

}
