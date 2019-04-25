import { ChangeDetectorRef, Component, OnInit, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { NotificationService} from '../../../../shared/notification';
import {Captcha} from '../../../../shared/captcha/captcha';
import { ReservationService} from '../reservation.service';
import { Reservation} from '../reservation';
import { ActivatedRoute, Params, Router} from '@angular/router';
declare var hljs: any;

export interface StatusItem {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-reservation-create',
  templateUrl: './reservation-create.component.html',
  styleUrls: ['./reservation-create.component.scss']
})
export class ReservationCreateComponent implements OnInit {
  public reservationForm: FormGroup;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public usrTypeId = JSON.parse(localStorage.getItem('userInfo')).usrTypeId;
  resultInfo: Reservation;
  message = '';
  siteKey: any;
  submitted = false;

    constructor(
      private reservationService: ReservationService,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private router: Router,
      private http: HttpClient,
      private cdr: ChangeDetectorRef,
      private notificationService: NotificationService,
      ){ 
        this.reservationForm = fb.group({
        'action' : ['add'],
        'prdctDetId': [this.prdctDetId],
        'resrId': ['0'],
        'bfdy': [null, Validators.required],
        'bfwk': [null, Validators.required],
        'afwk': [null, Validators.required],
        'resVal': [null, Validators.required],
        'usrId': [this.userId],
        'captcha': [null, Validators.required]
        });
      }

  ngOnInit() { }

  updateItems(){
    this.submitted = true;
      if (this.reservationForm.invalid) {
      return;
    }

    this.http.post('ema/partner/reservation-update', this.reservationForm.value, {responseType: 'text'}).subscribe(res => {
      if (res === 'SUCCESS') {
        this.notificationService.onSuccess('Successfully Added.');
        this.router.navigateByUrl('/venue/reservation/show');
      } else {
         this.notificationService.onError('Oops! Something went wrong.');
      }
    });
  }

  goBack(){
    this.router.navigate(['/venue/reservation/show']);
  }
  
  get f() {
    return this.reservationForm.controls;
  } 
 
}
