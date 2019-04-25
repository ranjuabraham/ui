import { ChangeDetectorRef, Component, OnInit, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { NotificationService} from '../../../../shared/notification';
//import { Captcha} from '../../../../shared/captcha/captcha';
import { CostMapping} from '../cost-mapping';
import { CostMappingService} from '../cost-mapping.service';
import { ActivatedRoute, Params, Router} from '@angular/router';
declare var hljs: any;

export interface IndexItem {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-cost-mapping-update',
  templateUrl: './cost-mapping-update.component.html',
  styleUrls: ['./cost-mapping-update.component.scss']
})

export class CostMappingUpdateComponent implements OnInit {
  public costMapperForm: FormGroup;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public usrTypeId = JSON.parse(localStorage.getItem('userInfo')).usrTypeId;
  $prdctDetId  = this.route.snapshot.params['prdctDetId'];
  $attrId  = this.route.snapshot.params['attrId'];
  resultInfo: CostMapping;
  restItems: any;
  events: any;
  duration: any;
  foodType: any;
  halls: any;
  message = '';
  siteKey: any;
  submitted = false;

  displayTax: IndexItem[] = [
    {value: 0, viewValue: 'None'},
    {value: 5, viewValue: '05% ( SGST @ 02.5% & CGST @ 02.5% )'},
    {value: 12, viewValue: '12% ( SGST @ 06.0% & CGST @ 06.0% )'},
    {value: 18, viewValue: '18% ( SGST @ 09.0% & CGST @ 09.0% )'},
    {value: 28, viewValue: '28% ( SGST @ 14.0% & CGST @ 14.0% )'},
  ];

  constructor(
      private costMappingService: CostMappingService,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private router: Router,
      private http: HttpClient,
      private cdr: ChangeDetectorRef,
      private notificationService: NotificationService,
  ) { 
    this.costMapperForm = fb.group({
      'action' : ['update'],
      'prdctDetId': [this.$prdctDetId],
      'valId': [null, Validators.required], 
      'evtId': [null, Validators.required],
      'durId':  [null, Validators.required],
      'fdTypId':  [null, Validators.required],
      'rentVal':  [null, Validators.required],
      'servChrg':  [null, Validators.required],
      'subPrdctDetId': [null, Validators.required],
      'miscChrg':  [''],
      'muhurtChrg': [''],
      'captcha': [null, Validators.required]
    });
  }

  ngOnInit() {
    this.costMappingService.loadItemById(this.$prdctDetId, this.$attrId)
    .subscribe(response => {  
      this.restItems = response; 
      this.resultInfo = this.restItems.result; 
      this.events = this.restItems.events; 
      this.duration = this.restItems.duration; 
      this.foodType = this.restItems.foodType; 
      this.halls = this.restItems.halls; 
    });
  }

  updateItems() {
    this.submitted = true;
       if (this.costMapperForm.invalid) {
        return;
      }

    this.http.post('ema/partner/tariff-update', this.costMapperForm.value, {responseType: 'text'}).subscribe(res => {
      if (res === 'SUCCESS') {
        this.notificationService.onSuccess('Successfully Updated.');
        this.router.navigateByUrl('/venue/cost-map/show');
      } else {
        this.notificationService.onError('Oops! Something went wrong.');
      }
    });
  }

  goBack() {
    this.router.navigate(['/venue/cost-map/show']);
  }

  get f() {
    return this.costMapperForm.controls;
  }

}
