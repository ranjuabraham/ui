import { Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {AppService} from '../../../../app.service';
import {DialogData} from '../marriage-halls/marriage-halls.component';
import {WriteReviewDialogComponent} from '../write-review-dialog/write-review-dialog.component';
import {LoginDialogComponent} from '../../login-dialog/login-dialog.component';

@Component({
  selector: 'app-reviews-dialog',
  templateUrl: './reviews-dialog.component.html',
  styleUrls: ['./reviews-dialog.component.scss'],
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
  public close(): void {
    this.dialogRef.close();
  }
  get isLoggedIn(): boolean {
    // Check if current date is before token
    // expiration and user is signed in locally
    return JSON.parse(localStorage.getItem('userInfo'));
  }
  dialogClose(): void {
    this.dialogRef.close();
  }
  onClick(rvwRating: number): void {
    this.rvwRating = rvwRating;
  }
  public getHallReviews() {
    this.appService.getHallReviews(this.data.prdctDetId).subscribe(data => {
      this.reviewDatas = data;
      this.hallName = this.reviewDatas.name;
      this.reviewDatas = this.reviewDatas.list;
    });
  }
  writeReviewDialog(prdctDetId: number, hallName: string): void {
    if (!this.isLoggedIn) {
      const dialogRef = this.dialog.open(LoginDialogComponent, {
        // width: '100%',
        disableClose: true,
        data: {},
        panelClass: 'login-dialog-box'
      });
    } else {
      this.prdctDetId = prdctDetId;
      const writeReview = this.dialog.open(WriteReviewDialogComponent, {
        width: '70%',
        panelClass: 'write-review-dialog-box',
        disableClose: true,
        data: {prdctDetId: prdctDetId, hallName: hallName}
      });
      this.dialogRef.close();
    }
  }

}
