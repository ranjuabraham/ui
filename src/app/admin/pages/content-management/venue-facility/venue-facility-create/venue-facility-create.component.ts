import {ChangeDetectorRef, Component, OnInit, AfterViewInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {VenueFacilityService} from '../venue-facility.service';
import {VenueFacility} from '../venue-facility';
import {NotificationService} from '../../../../shared/notification';
import {StatusItem} from '../venue-facility-edit/venue-facility-edit.component';
import {HttpClient} from '@angular/common/http';


export interface FacilityItem {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-venue-facility-create',
  templateUrl: './venue-facility-create.component.html',
  styleUrls: ['./venue-facility-create.component.scss']
})
export class VenueFacilityCreateComponent implements OnInit {

  public facilityForm: FormGroup;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public usrTypeId = JSON.parse(localStorage.getItem('userInfo')).usrTypeId;
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
    // To google captcha site key
    //this.siteKey = captcha.siteKey;
    // To initialize FormGroup
    this.facilityForm = fb.group({
      'action': ['add'],
      'prdctDetId': [this.prdctDetId],
      'subPrdctDetId': [null, Validators.required],
      'facId': [null, Validators.required],
      'facAct': [null, Validators.required],
      'facSpec': [null, Validators.required],
      'usrId': [this.userId],
      'attrId': [0],
      'captcha': [null]
    });
  }

  ngOnInit() {
    this.loadFacilityMaster();
  }

  updateFacilities() {
    this.submitted = true;
    if (this.facilityForm.invalid) {
      return;
    }
    this.http.post('ema/partner/facility-update', this.facilityForm.value, {responseType: 'text'}).subscribe(res => {
      if (res === 'SUCCESS') {
        this.notificationService.onSuccess('Successfully Added.');
        this.router.navigateByUrl('/venue/facilities/show');
      } else {
        this.notificationService.onError('Oops! Something went wrong.');
      }
    });
  }

  loadFacilityMaster() {
    this.facilityService.loadFacilityMaster(this.prdctDetId)
      .subscribe(heroes => {
        this.facInfo = heroes;
      })
  }

    goBack()
    {
      this.router.navigate(['/venue/facilities/show']);
    }

    // convenience getter for easy access to form fields
    get
    f()
    {
      return this.facilityForm.controls;
    }


  }
