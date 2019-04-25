import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-amenities-dialog',
  templateUrl: './amenities-dialog.component.html',
  styleUrls: ['./amenities-dialog.component.scss']
})
export class AmenitiesDialogComponent implements OnInit {
  public violet = '../../../../assets/images/icons/violet/';
  public iconUrl = '../../../../../assets/images/icons/hall-list/';
  venueInfo: any;
  constructor(public dialogRef: MatDialogRef<AmenitiesDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    console.log('mooorthiiiiiiiiiiiiiiiiiiiii');
    console.log(this.data);
  }
  dialogClose(): void {
    this.dialogRef.close();
  }
}
