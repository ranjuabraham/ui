import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Feedback} from './feedback';
import {FeedbackService} from './feedback.service';
import { NotificationService} from '../../shared/notification';
import {LoginDialogComponent} from "../login-dialog/login-dialog.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  feedbackData: Feedback[] = [];
  rating = 3;
  rvwRating = 0;
  data: any;
  submitted = false;
  rvwTitle: any;
  rvwBody: any;
  rvwName: any;
  rvwId: any;
  prdctDetId: any;
  message: any;
  constructor(private fb: FormBuilder,
              private router: Router,
              private http: HttpClient,
              private route: ActivatedRoute,
              private feedbackService: FeedbackService,
              public dialog: MatDialog,
              private notificationService: NotificationService) {
    this.feedbackForm = this.fb.group({
      rvwTitle: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      rvwBody: ['', Validators.compose([Validators.required, Validators.minLength(60), Validators.maxLength(200)])],
      rvwRating: [''],
      rvwName: ['', Validators.compose([Validators.required, Validators.maxLength(25)])],
      rvwId: [0],
      prdctDetId: [0],
      action: ['action'],
      hideRequired: false,
      floatLabel: 'auto',
    });
  }

  ngOnInit() {
    if(!JSON.parse(localStorage.getItem('userInfo'))){
      const dialogRef = this.dialog.open(LoginDialogComponent, {
        disableClose: true,
        data: {},
        panelClass: 'login-dialog-box'
      });
    }
  }
  onClick(rvwRating: number): void {
    this.rvwRating = rvwRating;
  }

  onSubmit() {
    if(!JSON.parse(localStorage.getItem('userInfo'))){
      const dialogRef = this.dialog.open(LoginDialogComponent, {
        disableClose: true,
        data: {},
        panelClass: 'login-dialog-box'
      });
      return false;
    }
    this.rvwTitle = this.feedbackForm.value['rvwTitle'];
    this.rvwBody = this.feedbackForm.value['rvwBody'];
    this.rvwName = this.feedbackForm.value['rvwName'];
    this.data = {
      rvwTitle: this.rvwTitle,
      rvwBody: this.rvwBody,
      rvwRating: this.rvwRating,
      rvwName: this.rvwName,
      userId: JSON.parse(localStorage.getItem('userInfo')).usrId,
      rvwId: 0,
      prdctDetId: 0,
      action: 'add'
    };

    this.submitted = true;
    // stop here if form is invalid
    if (this.feedbackForm.invalid) {
      return;
    } else {
      this.http.post('/ema/login/update-reviews', this.data, {responseType: 'text'}).subscribe(res => {
        this.data = res;
        if (this.data === 'SUCCESS') {
          this.notificationService.onSuccess('Your Review is added successfully.');
          this.router.navigateByUrl('/my-reviews');
        }
      });
    }
  }
}
