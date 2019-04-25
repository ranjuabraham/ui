import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MyReviews} from '../my-reviews';
import {MyReviewsService} from '../my-reviews.service';
import {NotificationService} from '../../../shared/notification';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  $rvwId = this.route.snapshot.params['rvwId'];
  // feedbackData: MyReviews[];
  feedbackData: MyReviews[] = [];
  items: MyReviews[];
  rating = 3;
  rvwRating: any;
  id = 1;
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
              private myReviewsService: MyReviewsService,
              private notificationService: NotificationService) {
    this.feedbackForm = this.fb.group({
      rvwTitle: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      rvwBody: ['', Validators.compose([Validators.required, Validators.minLength(60), Validators.maxLength(200)])],
      rvwRating: ['', Validators.required],
      rvwName: ['', Validators.compose([Validators.required, Validators.maxLength(40)])],
      rvwId: [''],
      prdctDetId: [''],
      action: ['update'],
    });
  }

  ngOnInit() {
    this.reviseReviewEdit();
  }

  reviseReviewEdit() {
    this.myReviewsService.reviseReviewEdit(this.$rvwId)
      .subscribe(datas => {this.feedbackData = datas;
      this.rvwRating = this.feedbackData['rvwRating'];
      });
}
  onClick(rvwRating: number): void {
   this.rvwRating = rvwRating;
  }

  onSubmit() {
    this.rvwTitle = this.feedbackForm.value['rvwTitle'];
    this.rvwBody = this.feedbackForm.value['rvwBody'];
    this.rvwName = this.feedbackForm.value['rvwName'];
    this.rvwId = this.feedbackForm.value['rvwId'];
    this.prdctDetId = this.feedbackForm.value['prdctDetId'];
    this.data = {
      rvwTitle: this.rvwTitle,
      rvwBody: this.rvwBody,
      rvwRating: this.rvwRating,
      rvwName: this.rvwName,
      userId: this.userId,
      rvwId: this.rvwId,
      prdctDetId: this.prdctDetId,
      action: 'update'
    };

    this.submitted = true;
    // stop here if form is invalid
    if (this.feedbackForm.invalid) {
      return;
    } else {
      this.http.post('/ema/login/update-reviews', this.data, {responseType: 'text'}).subscribe(res => {
        this.data = res;
        if (this.data === 'SUCCESS') {
          this.notificationService.onSuccess('Your review is successfully updated.');
          this.router.navigateByUrl('/my-reviews');
        }
      });
    }
  }
}
