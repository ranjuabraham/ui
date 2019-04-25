import {ChangeDetectorRef, Component, OnInit, AfterViewInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
//import { HttpClient} from '@angular/common/http';
import {NotificationService} from '../../../../shared/notification';
import {Promotion} from '../promotion';
import {PromotionService} from '../promotion.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

export interface IndexItem {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-promotion-edit',
  templateUrl: './promotion-edit.component.html',
  styleUrls: ['./promotion-edit.component.scss']
})
export class PromotionEditComponent implements OnInit {

  public promoForm: FormGroup;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public usrTypeId = JSON.parse(localStorage.getItem('userInfo')).usrTypeId;
  $prdctDetId = this.route.snapshot.params['prdctDetId'];
  $attrId = this.route.snapshot.params['attrId'];
  resultInfo: Promotion;
  restItems: any;
  message = '';
  siteKey: any;
  submitted = false;

  displaySequence: IndexItem[] = [
    {value: 1, viewValue: '1'},
    {value: 2, viewValue: '2'},
    {value: 3, viewValue: '3'},
    {value: 4, viewValue: '4'},
    {value: 5, viewValue: '5'},
    {value: 6, viewValue: '6'},
    {value: 7, viewValue: '7'},
  ];
  displayStatus: IndexItem[] = [
    {value: 1, viewValue: 'Active'},
    {value: 2, viewValue: 'De-Active'}
  ];
  displayType: IndexItem[] = [
    {value: 1, viewValue: 'Offer'},
    {value: 2, viewValue: 'Advertisement'}
  ];

  constructor(private promoService: PromotionService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              private http: HttpClient,
              private cdr: ChangeDetectorRef,
              private notificationService: NotificationService) {
    this.promoForm = fb.group({
      'action': ['update'],
      'prdctDetId': [this.$prdctDetId],
      'offerId': [null, Validators.required],
      'offerHdr': [null, Validators.required],
      'offerShort': [null, Validators.required],
      'offerDet': [''],
      'offerImg': [''],
      'offerHint1': [''],
      'offerTyp': [null, Validators.required],
      'offerSeq': [null, Validators.required],
      'offerAct': [null, Validators.required],
      'usrId': [this.userId],
      'captcha': [null, Validators.required]
    });
  }

  ngOnInit() {
    this.promoService.loadItemById(this.$prdctDetId, this.$attrId)
      .subscribe(response => {
        this.resultInfo = response;
      });
  }

  updateItems() {
    this.submitted = true;
    if (this.promoForm.invalid) {
      return;
    }
    this.http.post('ema/partner/promotion-update', this.promoForm.value, {responseType: 'text'}).subscribe(res => {
      if (res === 'SUCCESS') {
        this.notificationService.onSuccess('Successfully Updated.');
        this.router.navigateByUrl('/venue/promotion/show');
      } else {
        this.notificationService.onError('Oops! Something went wrong.');
      }
    });
  }

  goBack() {
    this.router.navigate(['/venue/promotion/show']);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.promoForm.controls;
  }

}
