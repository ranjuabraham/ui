import {Component, OnInit , Input, ElementRef} from '@angular/core';
import {AppService} from '../../../app.service';
import {PopularHalls} from '../../../app.models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../shared/notification';
import {emailValidator} from '../../@theme/utils/app-validators';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
})
export class HomeComponent implements OnInit {
  public showBackToTop: boolean = false;
  @Input() appAutofocus: boolean;
  private el: any;
  public popularMarriageHalls: Array<PopularHalls>;
  public popularMiniHalls: Array<PopularHalls>;
  public popularPartyHalls: Array<PopularHalls>;
  public popularBanquetHalls: Array<PopularHalls>;

  placeholderLoader: boolean;
  contentLoader = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  quickContactForm: FormGroup;
  submitted = false;
  contact = true;
  contactOpen = false;
  data: any;
  loading = false;
  usrId: any;
  emailId: any;
  location: Location;
  constructor(public appService: AppService, public fb: FormBuilder,
              public router: Router,
              private route: ActivatedRoute,
              private http: HttpClient,
              private notificationService: NotificationService,
              location: Location,
              private spinner: NgxSpinnerService,
  private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
    this.quickContactForm = fb.group({
      cntName: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      cntEmailId: ['', Validators.compose([Validators.required, emailValidator, Validators.email, Validators.maxLength(30)])],
      cntNumber: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      usrTyp: [1, Validators.required],
      cntInfo: ['', Validators.compose([Validators.required, Validators.maxLength(100)])]
    });
    this.location = location;
  }

  ngOnInit() {
    this.getPopularHalls();
  }
  quickContact() {
    this.contact = false;
    this.contactOpen = true;
    this.el.focus();
  }
  onSubmit() {
    this.submitted = true;
    // // stop here if form is invalid
    if (this.quickContactForm.invalid) {
      return;
    }
    this.loading = true;
    this.http.post('/ema/venue/quick-contact', this.quickContactForm.value, {responseType: 'text'}).subscribe(res => {
      this.data = res;
      if (this.data === 'SUCCESS') {
        this.contactOpen = false;
        this.loading = false;
        this.contact = true;
        this.quickContactForm.reset();
        this.notificationService.onSuccess('Thank you. We will call back shortly.');
      } else {
        this.notificationService.onError('Oops! Something went wrong. Please try again later');
      }
    });
  }
  quickContactCloseBtn() {
    this.contactOpen = false;
    this.contact = true;
    this.quickContactForm.reset();
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  public getPopularHalls() {
    this.placeholderLoader = true;
    this.appService.getPopularHalls().subscribe(data => {
      this.popularMarriageHalls = data['mandapams'];
      this.popularMiniHalls = data['mini'];
      this.popularPartyHalls = data['party'];
      this.popularBanquetHalls = data['banquets'];
      setTimeout(function () {
        this.placeholderLoader = false;
      }.bind(this), 100);
    });
  }
}
