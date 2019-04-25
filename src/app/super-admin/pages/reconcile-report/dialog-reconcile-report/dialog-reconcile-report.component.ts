import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-reconcile-report',
  templateUrl: './dialog-reconcile-report.component.html',
  styleUrls: ['./dialog-reconcile-report.component.scss']
})
export class DialogReconcileReportComponent {

  constructor(public dialogRef: MatDialogRef<DialogReconcileReportComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
