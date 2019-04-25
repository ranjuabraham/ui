import {ChangeDetectorRef, Component, OnInit, AfterViewInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../../../shared/notification';
import {Captcha} from '../../../../shared/captcha/captcha';
import {AboutUsService} from '../about-us.service';
import {AboutUs} from '../about-us';
import {ActivatedRoute, Params, Router} from '@angular/router';

export interface SequenceItem {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-about-us-edit',
  templateUrl: './about-us-edit.component.html',
  styleUrls: ['./about-us-edit.component.scss']
})

export class AboutUsEditComponent implements OnInit {
  public aboutUsForm: FormGroup;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public usrTypeId = JSON.parse(localStorage.getItem('userInfo')).usrTypeId;
  $prdctDetId = this.route.snapshot.params['prdctDetId'];
  $attrId = this.route.snapshot.params['attrId'];
  aboutData: AboutUs;
  submitted = false;
  abtUsDet;
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

  constructor(
    private aboutUsService: AboutUsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public http: HttpClient,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService,
  ) {
    // To initialize FormGroup
    this.aboutUsForm = fb.group({
      'abtUsId': [null, Validators.required],
      'abtUsHdr': [''],
      'abtUsDet': [null, Validators.required],
      'abtUsSeq': [null, Validators.required],
      'abtUsAct': [null, Validators.required],
      'action': ['update'],
      'prdctDetId': [this.$prdctDetId],
      'usrId': [this.userId],
      'captcha': [null, Validators.required]
    });
  }

  ngOnInit() {
    this.loadAboutUsById();
  }

  loadAboutUsById() {
    this.aboutUsService.getAboutUsById(this.$prdctDetId, this.$attrId)
      .subscribe(heroes => this.aboutData = heroes);
  }

  goBack() {
    this.router.navigate(['/venue/about-us/show']);
  }

  updateAboutUs() {
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
}




