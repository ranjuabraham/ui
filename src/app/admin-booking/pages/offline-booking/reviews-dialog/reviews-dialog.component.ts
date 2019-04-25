import { Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {AppService} from '../../../../app.service';

export interface DialogData {
  prdctDetId: number;
}

@Component({
  selector: 'app-reviews-dialog',
  templateUrl: './reviews-dialog.component.html',
  styleUrls: ['./reviews-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReviewsDialogComponent implements OnInit {
  date = Date();
  rvwRating: any;
  rating = 3;
  reviewDatas;
  hallName: string;
  prdctDetId: number;
  constructor( public dialogRef: MatDialogRef<ReviewsDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: DialogData,  public dialog: MatDialog, private appService: AppService) {
  }

  ngOnInit() {
    this.getHallReviews();
  }

  get isLoggedIn(): boolean {
    // Check if current date is before token
    // expiration and user is signed in locally
    return JSON.parse(localStorage.getItem('userInfo'));
  }
  close(): void {
    this.dialogRef.close();
  }
  onClick(rvwRating: number): void {
    this.rvwRating = rvwRating;
  }
  public getHallReviews() {
    this.appService.getHallReviews(this.data.prdctDetId).subscribe(data => {
      this.reviewDatas = data;
      console.log( this.reviewDatas);
      this.hallName = this.reviewDatas.name;
      this.reviewDatas = this.reviewDatas.list;
    });
  }

}
