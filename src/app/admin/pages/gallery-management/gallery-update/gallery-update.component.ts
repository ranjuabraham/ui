import {ChangeDetectorRef, Component, OnInit, AfterViewInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../../shared/notification';
import {Captcha} from '../../../shared/captcha/captcha';
import {GalleryService} from '../gallery.service';
import {Gallery} from '../gallery';
import {ActivatedRoute, Params, Router} from '@angular/router';

declare var hljs: any;

export interface IndexItem {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-gallery-update',
  templateUrl: './gallery-update.component.html',
  styleUrls: ['./gallery-update.component.scss']
})
export class GalleryUpdateComponent implements OnInit {

  public galleryForm: FormGroup;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public usrTypeId = JSON.parse(localStorage.getItem('userInfo')).usrTypeId;
  $prdctDetId = this.route.snapshot.params['prdctDetId'];
  $attrId = this.route.snapshot.params['attrId'];
  restItems: any;
  resultInfo: Gallery;
  hallInfo: any;
  message = '';
  siteKey: any;
  submitted = false;

  Sequence: IndexItem[] = [
    {value: 1, viewValue: '01'},
    {value: 2, viewValue: '02'},
    {value: 3, viewValue: '03'},
    {value: 4, viewValue: '04'},
    {value: 5, viewValue: '05'},
    {value: 6, viewValue: '06'},
    {value: 7, viewValue: '07'},
    {value: 8, viewValue: '08'},
    {value: 9, viewValue: '09'},
    {value: 10, viewValue: '10'},
    {value: 11, viewValue: '11'},
    {value: 12, viewValue: '12'},
    {value: 13, viewValue: '13'},
    {value: 14, viewValue: '14'},
    {value: 15, viewValue: '15'},
    {value: 16, viewValue: '16'},
    {value: 17, viewValue: '17'},
    {value: 18, viewValue: '18'},
    {value: 19, viewValue: '19'},
    {value: 20, viewValue: '20'}
  ];

  displayImageType: IndexItem[] = [
    {value: 1, viewValue: 'ALL'},
    {value: 2, viewValue: 'DP / Home'},
    {value: 3, viewValue: 'About Us'},
    {value: 4, viewValue: 'Facilities'},
    {value: 5, viewValue: 'Offers'},
    {value: 6, viewValue: 'logo'}
  ];

  constructor(
    private galleryService: GalleryService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService,
  ) {
    this.galleryForm = fb.group({
      'action': ['update'],
      'prdctDetId': [this.prdctDetId],
      'imgId': [null, Validators.required],
      'imgFtrDet': [null, Validators.required],
      'imgPath': [null, Validators.required],
      'imgTypId': [null, Validators.required],
      'imgSeq': [null, Validators.required],
      'usrId': [this.userId],
      'captcha': [null]
    });
  }

  ngOnInit() {
    this.galleryService.loadItemById(this.$prdctDetId, this.$attrId)
      .subscribe(response => {
        this.resultInfo = response;
        console.log(this.resultInfo);
      });
  }

  updateItems() {
    console.log(this.galleryForm.value);
    this.submitted = true;
    if (this.galleryForm.invalid) {
      return;
    }
    this.http.post('/ema/partner/gallery-update', this.galleryForm.value, {responseType: 'text'}).subscribe(res => {
      if (res === 'SUCCESS') {
        this.notificationService.onSuccess('Successfully Added.');
        this.router.navigateByUrl('/venue/gallery/show');
      } else {
        this.notificationService.onError('Oops! Something went wrong.');
      }
    });
  }

  goBack() {
    this.router.navigate(['/venue/gallery/show']);
  }


  // convenience getter for easy access to form fields
  get f() {
    return this.galleryForm.controls;
  }



}

