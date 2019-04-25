import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MyReviewsService} from './my-reviews.service';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.scss']
})
export class MyReviewsComponent implements OnInit {
  myReviewsData: any;
  list: any;
  count: any;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  constructor( private router: Router,
               private http: HttpClient,
               private myReviewsService: MyReviewsService) { }

  ngOnInit() {
    this.getMyReviews();
  }
  /** GET: get My Reviews records from the server */
  getMyReviews() {
    this.myReviewsService.getMyReviews(this.userId)
      .subscribe(data => {this.myReviewsData = data;
      this.count = this.myReviewsData.count;
      // console.log(this.count);
      });
  }
}
