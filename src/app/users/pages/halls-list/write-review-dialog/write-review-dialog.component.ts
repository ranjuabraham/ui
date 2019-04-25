import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';

import {DialogData} from '../marriage-halls/marriage-halls.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {WriteReview} from '../../../../app.models';
import {AppService} from '../../../../app.service';

@Component({
  selector: 'app-write-review-dialog',
  templateUrl: './write-review-dialog.component.html',
  styleUrls: ['./write-review-dialog.component.scss']
})
export class WriteReviewDialogComponent implements OnInit {
  public firstName = JSON.parse(localStorage.getItem('userInfo')).usrFrstName;
  public lastName = JSON.parse(localStorage.getItem('userInfo')).usrLstName;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  rvwRating: any;
  rating = 3;
  writeReviewForm: FormGroup;
  submitted = false;
  rvwTitle: any;
  rvwBody: any;
  rvwName: any;
  rvwId: any;
  prdctDetId: any;
  writeReviewData;
  writeReview: WriteReview [] = [];
  reviewData: any;
  login;
  public loadReview; // store my review in individual venue
  public reviewContent;
  public reviewRating;

  constructor(public dialogRef: MatDialogRef<WriteReviewDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              public fb: FormBuilder, private http: HttpClient, public router: Router,
              private route: ActivatedRoute,
              public snackBar: MatSnackBar,
              public appService: AppService) {
    this.writeReviewForm = this.fb.group({
      rvmId: [0, Validators.compose([Validators.required])],
      rvmName: [this.firstName, Validators.compose([Validators.required])],
      rvmTitle: [''],
      rvmRating: [''],
      // rvmBody: ['', Validators.compose([Validators.required, Validators.minLength(60), Validators.maxLength(200)])],
      rvmBody: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(500)])],
      userId: [this.userId, Validators.compose([Validators.required])],
      prdctDetId: [data.prdctDetId, Validators.compose([Validators.required])],
      action: ['add', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    this.getMyVenueReviews();
  }

  public close(): void {
    this.dialogRef.close();
  }

  dialogClose(): void {
    this.dialogRef.close();
  }

  onClick(rvwRating: number): void {
    this.rvwRating = rvwRating;
  }

  // onSubmit() {
  //   console.warn(this.writeReviewForm.value);
  //   this.submitted = true;
  //   // // stop here if form is invalid
  //   if (this.writeReviewForm.invalid) {
  //     return;
  //   }
  //   // console.warn(this.writeReviewForm.value);
  //   this.http.post('/ema/login/update-reviews', this.writeReviewForm.value, {responseType: 'text'}).subscribe(res => {
  //     this.writeReviewData = res;
  //   });
  // }
  getMyVenueReviews() {
    this.appService.getMyVenueReviews(this.data.prdctDetId, this.userId)
      .subscribe(res => {
        this.loadReview = res;
        if (this.loadReview) {
          this.reviewContent = this.loadReview['rvwBody'];
          this.rvwRating = this.loadReview['rvwRating'];
        }
      });
  }

  onSubmit() {
    const reviewContent = this.writeReviewForm.value.rvmBody;
    this.rvwBody = this.writeReviewForm.value.rvwBody;
    this.rvwName = this.firstName;
    this.reviewData = {
      rvwTitle: '',
      rvwBody: reviewContent,
      rvwRating: this.rvwRating,
      rvwName: this.rvwName,
      userId: this.userId,
      rvwId: 0,
      prdctDetId: this.data.prdctDetId,
      action: 'add'
    };

    this.submitted = true;
    // stop here if form is invalid
    if (this.writeReviewForm.invalid) {
      return;
    } else {
      this.http.post('/ema/login/update-reviews', this.reviewData, {responseType: 'text'}).subscribe(res => {
        this.writeReviewData = res;
        if (res === 'SUCCESS') {
          this.dialogRef.close();
          this.snackBar.open('Your review is added successfully.', '×', {
            panelClass: 'success',
            verticalPosition: 'top',
            duration: 3000
          });
        } else {
          this.snackBar.open('Oops! Something went wrong.', '×', {
            panelClass: 'error',
            verticalPosition: 'top',
            duration: 3000
          });
        }
      });
    }
  }
}
