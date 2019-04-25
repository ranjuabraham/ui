import { ChangeDetectorRef, Component, OnInit, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { NotificationService} from '../../../../shared/notification';
import { VenueFacilityService} from '../venue-facility.service';
import { VenueFacility} from '../venue-facility';
import { ActivatedRoute, Params, Router} from '@angular/router';


export interface StatusItem {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-venue-facility-edit',
  templateUrl: './venue-facility-edit.component.html',
  styleUrls: ['./venue-facility-edit.component.scss']
})
export class VenueFacilityEditComponent implements OnInit {

  public facilityForm: FormGroup;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public usrTypeId = JSON.parse(localStorage.getItem('userInfo')).usrTypeId;
  $prdctDetId  = this.route.snapshot.queryParamMap.get('prdctDetId');
  $hallId  = this.route.snapshot.queryParamMap.get('hallId'); 
  $facId  = this.route.snapshot.queryParamMap.get('facId'); 
  $attrId  = this.route.snapshot.queryParamMap.get('attrId');
  facInfo: VenueFacility;
  message = '';
  siteKey: any;
  submitted = false;

  displayStatus: StatusItem[] = [
    {value: 1, viewValue: 'Active'},
    {value: 2, viewValue: 'De-Active'}
  ];

  

  constructor(
    private facilityService: VenueFacilityService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    //private captcha: Captcha,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService,
  ) {
    this.facilityForm = fb.group({
      'action' : ['update'],
      'prdctDetId': [this.$prdctDetId],
      'subPrdctDetId': [null, Validators.required],
      'hallName': [],
      'facId': [null, Validators.required],
      'facName': [],
      'facAct': [null, Validators.required],
      'facSpec': [null, Validators.required],
      'usrId': [this.userId],
      'attrId': [null, Validators.required],
      'captcha': [null, Validators.required]
    });
  }
   
  ngOnInit() {
    this.loadFacilityUsById();
  }

  loadFacilityUsById(){
    this.facilityService.getFacilityById(this.$prdctDetId, this.$hallId, this.$facId, this.$attrId)
      .subscribe(heroes => {this.facInfo = heroes;
      console.log(this.facInfo);});
  }

  updateFacilities()  {
    this.submitted = true;
    if (this.facilityForm.invalid) {
      return;
    }
    this.http.post('ema/partner/facility-update', this.facilityForm.value, {responseType: 'text'}).subscribe(res => {
      if (res === 'SUCCESS') {
        this.notificationService.onSuccess('Successfully Updated.');
        this.router.navigateByUrl('/venue/facilities/show');
      } else {
        this.notificationService.onError('Oops! Something went wrong.');
      }
    });
  }

  goBack(){
    this.router.navigate(['/venue/facilities/show']);
  }

  
  // convenience getter for easy access to form fields
  get f() {
    return this.facilityForm.controls;
  }


}
