import { ChangeDetectorRef, Component, OnInit, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { NotificationService} from '../../../../shared/notification';
import { HallDetailsService } from '../hall-details.service';
import { HallDetails} from '../hall-details';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { MatSelectChange } from '@angular/material';

export interface IndexItem {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-hall-details-create',
  templateUrl: './hall-details-create.component.html',
  styleUrls: ['./hall-details-create.component.scss']
})
export class HallDetailsCreateComponent implements OnInit {

  public hallInfoForm: FormGroup;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public usrTypeId = JSON.parse(localStorage.getItem('userInfo')).usrTypeId;
  $prdctDetId  = this.route.snapshot.params['prdctDetId'];
  $attrId  = this.route.snapshot.params['attrId'];
  resultInfo: HallDetails;
  submitted = false;
  hourlyFlag : number = 0;
  buffetFlag : number = 0;
  discountFlag : number = 0;

  displayStatus: IndexItem[] = [
    {value: 1, viewValue: 'Active'},
    {value: 2, viewValue: 'De-Active'}
  ];

  displayFlag: IndexItem[] = [
    {value: 1, viewValue: 'Yes'},
    {value: 2, viewValue: 'No'}
  ];

  displayDefault: IndexItem[] = [
    {value: 0, viewValue: 'No'},
    {value: 1, viewValue: 'Yes'}
  ];

  constructor(private hallInfoService: HallDetailsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService,) {
      this.hallInfoForm = fb.group({
        'action' : ['update'],
        'prdctDetId': [this.prdctDetId],
        'hallId': ['0'],
        'hallName': [null, Validators.required],
        'hallDesc': [null, Validators.required],
        'isDefault': [null, Validators.required],
        'hourlyFlg': [null, Validators.required],
        'buffetFlg': [null, Validators.required],
        'disocuntFlg': [null, Validators.required],
        'hourlyCost': ['0'],
        'maximumPax': ['0'],
        'minimumPax': ['0'],
        'muhurtDisc': ['0'],
        'nonMuhurtDisc': ['0'],
        'splDayDisc':  ['0'],
        'discountPeriod': ['0'],
        'hallAct': [null, Validators.required],
        'usrId': [this.userId],
        'captcha': [null, Validators.required]
      });
     }

  ngOnInit() {
  }

  updateItems(){
    this.submitted = true;
       if (this.hallInfoForm.invalid) {
        return;
      }

      this.http.post('ema/partner/hall-details-update', this.hallInfoForm.value, {responseType: 'text'}).subscribe(res => {
        if (res === 'SUCCESS') {
          this.notificationService.onSuccess('Successfully Updated.');
          this.goBack();
        } else {
          this.notificationService.onError('Oops! Something went wrong.');
        }
      });
    }

    enableHourly(event: MatSelectChange){
      const catgFlag = JSON.parse(event.value);
      this.enableFlag('hourly', catgFlag);
    }

    enableBuffet(event: MatSelectChange){
      const catgFlag = JSON.parse(event.value);
      this.enableFlag('buffet', catgFlag);
    }

    enableDiscount(event: MatSelectChange){
      const catgFlag = JSON.parse(event.value);
      this.enableFlag('discount', catgFlag);
    }

    enableFlag(content: string, flag: number)
    {
      if(content === 'hourly')
      {
        this.hourlyFlag = flag;
      }
      else if(content === 'buffet'){
        this.buffetFlag = flag;
      }
      else if(content === 'discount'){
        this.discountFlag = flag;
      }  
    }

    goBack() {
      this.router.navigate(['/venue/hall-details/show']);
    } 

    get f() {
      return this.hallInfoForm.controls;
    }

}
