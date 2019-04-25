import { ChangeDetectorRef, Component, OnInit, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { NotificationService} from '../../../../shared/notification';
import {Captcha} from '../../../../shared/captcha/captcha';
import { PaxCountService } from '../pax-count.service';
import { PaxCount} from '../pax-count';
import { ActivatedRoute, Params, Router} from '@angular/router';

export interface IndexItem {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-pax-count-update',
  templateUrl: './pax-count-update.component.html',
  styleUrls: ['./pax-count-update.component.scss']
})
export class PaxCountUpdateComponent implements OnInit {

  public paxCountForm: FormGroup;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public usrTypeId = JSON.parse(localStorage.getItem('userInfo')).usrTypeId;
  $prdctDetId  = this.route.snapshot.params['prdctDetId'];
  $attrId  = this.route.snapshot.params['attrId'];
  restItems: any;
  resultInfo: PaxCount;
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
      private paxCountService: PaxCountService,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private router: Router,
      private http: HttpClient,
      private cdr: ChangeDetectorRef,
      private notificationService: NotificationService,
    ) { 
        this.paxCountForm = fb.group({
        'action' : ['update'],
        'prdctDetId': [this.prdctDetId],
        'buffId': [null, Validators.required],
        'subPrdctDetId': [null, Validators.required],
        'buffCount': [null, Validators.required],
        'buffMax':[null, Validators.required],
        'usrId': [this.userId],
        'captcha': [null, Validators.required]
        
      });
}

  ngOnInit() {
    this.paxCountService.loadItemById(this.$prdctDetId, this.$attrId)
    .subscribe(response => {  
      this.restItems = response;
      this.resultInfo = this.restItems.result;
      this.hallInfo = this.restItems.halls;  });
  }

  updateItems(){
    this.submitted = true;
       if (this.paxCountForm.invalid) {
        return;
      }
      this.http.post('ema/partner/pax-count-update', this.paxCountForm.value, {responseType: 'text'}).subscribe(res => {
        if (res === 'SUCCESS') {
          this.notificationService.onSuccess('Successfully Updated.');
          this.goBack();
        } else {
          this.notificationService.onError('Oops! Something went wrong.');
        }
      });
    }

    goBack(){
      this.router.navigate(['/venue/pax-count/show']);
    } 

    get f() {
      return this.paxCountForm.controls;
    }
 
 
}
