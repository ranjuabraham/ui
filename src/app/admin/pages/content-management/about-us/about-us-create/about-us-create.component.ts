import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef, OnInit,
  ViewChild
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../../../shared/notification';
import {SequenceItem} from '../about-us-edit/about-us-edit.component';
import {AboutUsService} from '../about-us.service';

@Component({
  selector: 'app-about-us-create',
  templateUrl: './about-us-create.component.html',
  styleUrls: ['./about-us-create.component.scss']
})

export class AboutUsCreateComponent implements OnInit {

  public aboutUsForm: FormGroup;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public usrTypeId = JSON.parse(localStorage.getItem('userInfo')).usrTypeId;
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

  submitted = false;

  constructor(
    private aboutUsService: AboutUsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    private notificationService: NotificationService
    // private captcha: Captcha,
    // private cdr: ChangeDetectorRef,
  ) {
    // To initialize FormGroup
    this.aboutUsForm = fb.group({
      'abtUsId': ['0'],
      'abtUsHdr': [''],
      'abtUsDet': [null, Validators.required],
      'abtUsSeq': [null, Validators.required],
      'abtUsAct': [null, Validators.required],
      'action': ['add'],
      'prdctDetId': [this.prdctDetId],
      'usrId': [this.userId],
      'captcha': [null, Validators.required]
    });
  }


  ngOnInit() {
  }

// convenience getter for easy access to form fields
  get f() {
    return this.aboutUsForm.controls;
  }

  addAboutUs() {
    this.submitted = true;
    if (this.aboutUsForm.invalid) {
      return;
    }
    this.http.post('ema/partner/about-update', this.aboutUsForm.value, {responseType: 'text'}).subscribe(res => {
      if (res === 'SUCCESS') {
        this.notificationService.onSuccess('Successfully Added.');
        this.router.navigateByUrl('/venue/content-management/about-us/show');
      } else {
        this.notificationService.onError('Oops! Something went wrong.');
      }
    });
  }

  goBack() {
    this.router.navigate(['/venue/content-management/about-us/show']);
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }
}
