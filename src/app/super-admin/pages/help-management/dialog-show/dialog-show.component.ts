import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-show',
  templateUrl: './dialog-show.component.html',
  styleUrls: ['./dialog-show.component.scss']
})
export class DialogShowComponent {

  constructor(public dialogRef: MatDialogRef<DialogShowComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
