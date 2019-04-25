import { ChangeDetectorRef, Component, OnInit, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { NotificationService} from '../../../../shared/notification';
//import {Captcha} from '../../../../shared/captcha/captcha';
import { AmenitiesService} from '../amenities.service';
import { Amenities} from '../amenities';
import {ActivatedRoute, Params, Router} from '@angular/router';

export interface SequenceItem {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-amenities-edit',
  templateUrl: './amenities-edit.component.html',
  styleUrls: ['./amenities-edit.component.scss']
})

export class AmenitiesEditComponent implements OnInit {
  public amenitiesForm: FormGroup;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public usrTypeId = JSON.parse(localStorage.getItem('userInfo')).usrTypeId;
  $prdctDetId  = this.route.snapshot.params['prdctDetId'];
  $attrId  = this.route.snapshot.params['attrId'];
  amenities: Amenities;
  message = '';
  siteKey: any;
  submitted = false;

  displaySequence: SequenceItem[] = [
    {value: 1, viewValue: '1'},
    {value: 2, viewValue: '2'},
    {value: 3, viewValue: '3'},
    {value: 4, viewValue: '4'},
    {value: 5, viewValue: '5'},
    {value: 6, viewValue: '6'},
    {value: 7, viewValue: '7'},
  ];
  displayStatus: SequenceItem[] = [
    {value: 1, viewValue: 'Active'},
    {value: 2, viewValue: 'De-Active'}
  ];
  displayType: SequenceItem[] = [
    {value: 3, viewValue: 'HighLights'},
    {value: 4, viewValue: 'Chargeable Amenities'},
    {value: 5, viewValue: 'Others'}
  ];
  constructor(
    private amenitiesService: AmenitiesService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    //private captcha: Captcha,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService,
  ) { 
    this.amenitiesForm = fb.group({
      'facId': [null, Validators.required],
      'facName': [''],
      'facSpec': [null, Validators.required],
      'facSeq': [null, Validators.required],
      'facAct': [null, Validators.required],
      'action' : ['update'],
      'attrId': [null, Validators.required],
      'prdctDetId': [this.$prdctDetId],
      'usrId': [this.userId],
      'captcha': [null, Validators.required]
    });
  }

    ngOnInit() {
      this.loadAmenitiesById();
    }

    loadAmenitiesById(){
      this.amenitiesService.getAmenitiesById(this.$prdctDetId, this.$attrId)
      .subscribe(heroes => {this.amenities = heroes;});
    }

    updateAmenities(){
      this.submitted = true;
      if (this.amenitiesForm.invalid) {
      return;
    }

      this.http.post('ema/partner/amenities-update', this.amenitiesForm.value, {responseType: 'text'}).subscribe(res => {
        if (res === 'SUCCESS') {
          this.notificationService.onSuccess('Successfully Updated.');
          this.router.navigateByUrl('/venue/amenities/show');
        } else {
          this.notificationService.onError('Oops! Something went wrong.');
        }
      });
  }

  goBack(){
      this.router.navigate(['/venue/amenities/show']);
  }

   // convenience getter for easy access to form fields
  get f() {
    return this.amenitiesForm.controls;
  }
}
