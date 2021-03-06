import { ChangeDetectorRef, Component, OnInit, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { NotificationService} from '../../../../shared/notification';
import {Captcha} from '../../../../shared/captcha/captcha';
import { DiscountService} from '../discount.service';
import { Discount} from '../discount';
import { ActivatedRoute, Params, Router} from '@angular/router';
declare var hljs: any;

export interface IndexItem {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-discount-create',
  templateUrl: './discount-create.component.html',
  styleUrls: ['./discount-create.component.scss']
})
export class DiscountCreateComponent implements OnInit {

  public discountForm: FormGroup;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public usrTypeId = JSON.parse(localStorage.getItem('userInfo')).usrTypeId;
  restItems: any;
  resultInfo: Discount;
  hallInfo: any;
  message = '';
  siteKey: any;
  submitted = false;
  
  displayStatus: IndexItem[] = [
    {value: 1, viewValue: 'Active'},
    {value: 2, viewValue: 'De-Active'}
  ];

  displayDay: IndexItem[] = [
    {value: 0, viewValue: 'Non-Muhurtham Day'},
    {value: 1, viewValue: 'Muhurtham Day'},
    {value: 2, viewValue: 'Special Day'}
  ];
  
    constructor(
      private discountService: DiscountService,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private router: Router,
      private http: HttpClient,
      private cdr: ChangeDetectorRef,
      private notificationService: NotificationService,
    ) { 
        this.discountForm = fb.group({
        'action' : ['update'],
        'prdctDetId': [this.prdctDetId],
        'discId': [0],
        'subPrdctDetId': [null, Validators.required],
        'discAct': [null, Validators.required],
        'disAmount':[null, Validators.required],
        'discMuhurt': [null, Validators.required],
        'validDays': [null, Validators.required],
        'usrId': [this.userId],
        'captcha': [null, Validators.required]
      });
}

  ngOnInit() {
    this.discountService.loadMasters(this.prdctDetId)
    .subscribe(response => {this.hallInfo = response; });
  }

  updateItems(){
    this.submitted = true;
       if (this.discountForm.invalid) {
        return;
      }
      this.http.post('ema/partner/discount-update', this.discountForm.value, {responseType: 'text'}).subscribe(res => {
        if (res === 'SUCCESS') {
          this.notificationService.onSuccess('Successfully Added.');
          this.goBack();
        } else {
          this.notificationService.onError('Oops! Something went wrong.');
        }
      });
  }

    goBack(){
      this.router.navigate(['/venue/discount/show']);
    }

    get f() {
      return this.discountForm.controls;
    }
 
}
