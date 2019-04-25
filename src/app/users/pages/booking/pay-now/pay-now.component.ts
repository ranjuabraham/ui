import {Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {AppService} from '../../../../app.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Component({
  selector: 'app-pay-now',
  templateUrl: './pay-now.component.html',
  styleUrls: ['./pay-now.component.scss']
})
export class PayNowComponent implements OnInit {
  @ViewChild('form') form: ElementRef;
  citrusPay: FormGroup;
  public resData: any;
  public paymentData: any;
  public bookedOn: any;
  public startDate: any;
  public endDate: any;
  public selectedItems: any;
  public userInfo = JSON.parse(localStorage.getItem('userInfo'));
  bookingId = this.route.snapshot.queryParamMap.get('bookingId');
  product = this.route.snapshot.queryParamMap.get('bookingId');
  prdctDetId = this.route.snapshot.queryParamMap.get('prdctDetId');
  public payuform: any = {};

  constructor(public appService: AppService, public router: Router,
              private route: ActivatedRoute,
              private http: HttpClient, private fb: FormBuilder) {
    this.citrusPay = this.fb.group({
      orderAmount: [null],
      currency: [null],
      returnUrl: [null],
      notifyUrl: [null],
      securitySignature: [null],
      secret_key: [null],
      vanityUrl: [null]
    });
  }

  ngOnInit() {
    this.getApprovalRequest();
  }

  getApprovalRequest() {
    this.appService.getPayNow(this.userInfo.usrId, this.userInfo.usrTypeId, this.bookingId, this.prdctDetId).subscribe(
      res => {
        this.resData = res['result'];
        this.paymentData = res['payment'];
        console.log(this.paymentData);
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
        this.startDate = ('0' + st.getDate()).slice(-2) + '.' + ('0' + st.getMonth() + 1).slice(-2) + '.' + st.getFullYear() + ' ' + weekday[st.getDay()];

        const enDate = endDate.split('|');
        const day2 = stDate[0];
        const month2 = +stDate[1];
        const year2 = stDate[2];
        const getEndDate = month1 + '.' + day1 + '.' + year1;
        const enD = new Date(getDate);
        this.endDate = ('0' + enD.getDate()).slice(-2) + '.' + ('0' + enD.getMonth() + 1).slice(-2) + '.' + enD.getFullYear() + ' ' + weekday[enD.getDay()];
      }
    );
  }

  citrusPayment() {
    const paymentPayload = {
      orderAmount: this.payuform.orderAmount,
      currency: this.payuform.currency,
      returnUrl: this.payuform.returnUrl,
      notifyUrl: this.payuform.notifyUrl,
      secSignature: this.payuform.securitySignature,
      secret_key: this.payuform.secret_key,
      vanityUrl: this.payuform.vanityUrl
    };
    return this.http.post<any>('http://localhost:4200/ema/login/booking-history?prdctDetId=0&userId=8&userType=1&typeId=1&bookingId=0', paymentPayload).subscribe(
      data => {
        console.log(data);
        console.log('payment success -----!!!!!');
      }, error1 => {
        console.log('payment failed -----!!!!!');
        console.log(error1);
      });
  }

  ccavenuePayment() {
    this.form.nativeElement.submit();
    console.log('krishna');
  }
}
