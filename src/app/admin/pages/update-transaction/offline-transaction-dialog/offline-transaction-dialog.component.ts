import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-offline-transaction-dialog',
  templateUrl: './offline-transaction-dialog.component.html',
  styleUrls: ['./offline-transaction-dialog.component.scss']
})
export class OfflineTransactionDialogComponent {

  constructor(public dialogRef: MatDialogRef<OfflineTransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  closeDialog(): void {
  this.dialogRef.close();
  }
  
}