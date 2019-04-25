import { ChangeDetectorRef, Component, OnInit, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { NotificationService} from '../../../../shared/notification';
import { Captcha} from '../../../../shared/captcha/captcha';
import { HourlyTariffService } from '../hourly-tariff.service';
import { HourlyTariff} from '../hourly-tariff';
import { ActivatedRoute, Params, Router} from '@angular/router';
declare var hljs: any;

export interface IndexItem {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-hourly-tariff-create',
  templateUrl: './hourly-tariff-create.component.html',
  styleUrls: ['./hourly-tariff-create.component.scss']
})
export class HourlyTariffCreateComponent implements OnInit {

  public hourlyForm: FormGroup;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public usrTypeId = JSON.parse(localStorage.getItem('userInfo')).usrTypeId;
  restItems: any;
  resultInfo: HourlyTariff;
  hallInfo: any;
  message = '';
  siteKey: any;
  submitted = false;
  
  displayStatus: IndexItem[] = [
    {value: 1, viewValue: 'Active'},
    {value: 2, viewValue: 'De-Active'}
  ];

    constructor(
      private hourlyService: HourlyTariffService,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private router: Router,
      private http: HttpClient,
      private cdr: ChangeDetectorRef,
      private notificationService: NotificationService,
    ) { 
        this.hourlyForm = fb.group({
        'action' : ['update'],
        'prdctDetId': [this.prdctDetId],
        'hrlyTarId': ['0'],
        'subPrdctDetId': [null, Validators.required],
        'adnlDurTar': [null, Validators.required],
        'adnlDurFlg':['1'],
        'adnlDurAct': [null, Validators.required],
        'usrId': [this.userId],
        'captcha': [null, Validators.required]
      });
}

  ngOnInit() {
    this.hourlyService.loadMasters(this.prdctDetId)
    .subscribe(response => {this.hallInfo = response; });
  }

  updateItems(){
    this.submitted = true;
       if (this.hourlyForm.invalid) {
        return;
      }
      
      this.http.post('ema/partner/hourly-cost-update', this.hourlyForm.value, {responseType: 'text'}).subscribe(res => {
        if (res === 'SUCCESS') {
          this.notificationService.onSuccess('Successfully Added.');
          this.goBack();
        } else {
          this.notificationService.onError('Oops! Something went wrong.');
        }
      });
    }

    goBack(){
      this.router.navigate(['/venue/hourly-tariff/show']);
    } 

    get f() {
      return this.hourlyForm.controls;
    }
 
}
