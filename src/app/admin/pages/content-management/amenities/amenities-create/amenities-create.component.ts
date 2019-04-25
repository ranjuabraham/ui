import { 
  AfterViewInit, 
  ChangeDetectorRef,
  Component,
  ElementRef, OnInit,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { SequenceItem } from '../amenities-edit/amenities-edit.component';
import { NotificationService} from '../../../../shared/notification';
import { AmenitiesService} from '../amenities.service';
import { Amenities} from '../amenities';


@Component({
  selector: 'app-amenities-create',
  templateUrl: './amenities-create.component.html',
  styleUrls: ['./amenities-create.component.scss']
})
export class AmenitiesCreateComponent implements OnInit {
  public amenitiesForm: FormGroup;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public usrTypeId = JSON.parse(localStorage.getItem('userInfo')).usrTypeId;
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
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private notificationService: NotificationService,
  ) { 
    this.amenitiesForm = fb.group({
      'facId': [0],
      'facName': [''],
      'facSpec': [null, Validators.required],
      'facSeq': [null, Validators.required],
      'facAct': [null, Validators.required],
      'action' : ['add'],
      'attrId': [null, Validators.required],
      'prdctDetId': [this.prdctDetId],
      'usrId': [this.userId],
      'captcha': [null, Validators.required]
  });
}

ngOnInit() {
  //this.addAmenities();
}

  updateAmenities()  {
    this.submitted = true;
    // stop here if form is invalid
    if (this.amenitiesForm.invalid) {
      return;
    }
    // console.warn(this.quickcontactForm.value);
    this.http.post('ema/partner/amenities-update', this.amenitiesForm.value, {responseType: 'text'}).subscribe(res => {
      if (res === 'SUCCESS') {
        this.notificationService.onSuccess('Successfully Added.');
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
