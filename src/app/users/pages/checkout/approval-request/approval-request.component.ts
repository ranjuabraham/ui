import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../../app.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-approval-request',
  templateUrl: './approval-request.component.html',
  styleUrls: ['./approval-request.component.scss']
})
export class ApprovalRequestComponent implements OnInit {
  public resData: any;
  public bookedOn: any;
  public startDate: any;
  public endDate: any;
  public selectedItems: any;
  public userInfo = JSON.parse(localStorage.getItem('userInfo'));
  bookingId = this.route.snapshot.queryParamMap.get('bookingId');

  constructor(public appService: AppService, public router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getApprovalRequest();
  }

  getApprovalRequest() {
    this.appService.getApprovalRequest(this.userInfo.usrId, this.userInfo.usrTypeId, this.bookingId).subscribe(
      res => {
        this.resData = res;
        if (this.resData['selectItems']) {
          this.selectedItems = JSON.parse(this.resData['selectItems']);
        }
        const bookedOn = this.resData['bookedOn'];
        const startDate = this.resData['muhurtDts'];
        const endDate = this.resData['endDt'];
        // console.log(startDate);
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const weekday = new Array(7);
        weekday[0] = 'Sunday';
        weekday[1] = 'Monday';
        weekday[2] = 'Tuesday';
        weekday[3] = 'Wednesday';
        weekday[4] = 'Thursday';
        weekday[5] = 'Friday';
        weekday[6] = 'Saturday';

        const arr = bookedOn.split('|');
        const day = arr[0];
        const month = +arr[1] - 1;
        const year = arr[2];
        this.bookedOn = day + ' ' + monthNames[month] + ' ' + year;

        const stDate = startDate.split('|');
        const day1 = stDate[0];
        const month1 = +stDate[1];
        const year1 = stDate[2];
        const getDate = month1 + '.' + day1 + '.' + year1;
        const st = new Date(getDate);
        this.startDate = ('0' + st.getDate()).slice(-2) + '.' + ('0' + (+st.getMonth() + 1)).slice(-2) + '.' + st.getFullYear() + ' ' + weekday[st.getDay()];

        const enDate = endDate.split('|');
        const day2 = stDate[0];
        const month2 = +stDate[1];
        const year2 = stDate[2];
        const getEndDate = month2 + '.' + day2 + '.' + year2;
        const enD = new Date(getEndDate);
        this.endDate = ('0' + enD.getDate()).slice(-2) + '.' + ('0' + (+enD.getMonth() + 1)).slice(-2) + '.' + enD.getFullYear() + ' ' + weekday[enD.getDay()];
      }
    );
  }
}
