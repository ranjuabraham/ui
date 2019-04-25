import { ChangeDetectorRef, Component, OnInit, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { NotificationService} from '../../../../shared/notification';
//import {Captcha} from '../../../../shared/captcha/captcha';
import { DurationService} from '../duration.service';
import { Duration} from '../duration';
import { ActivatedRoute, Params, Router} from '@angular/router';

export interface IndexItem {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-duration-update',
  templateUrl: './duration-update.component.html',
  styleUrls: ['./duration-update.component.scss']
})

export class DurationUpdateComponent implements OnInit {

  public durationForm: FormGroup;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public usrTypeId = JSON.parse(localStorage.getItem('userInfo')).usrTypeId;
  $prdctDetId  = this.route.snapshot.params['prdctDetId'];
  $attrId  = this.route.snapshot.params['attrId'];
  restItems: any;
  resultInfo: Duration;
  events: any;
  message = '';
  siteKey: any;
  submitted = false;
  
  displaySequence: IndexItem[] = [
    {value: 1, viewValue: '1'},
    {value: 2, viewValue: '2'},
    {value: 3, viewValue: '3'},
    {value: 4, viewValue: '4'},
    {value: 5, viewValue: '5'},
    {value: 6, viewValue: '6'},
    {value: 7, viewValue: '7'},
  ];
  
  displayStatus: IndexItem[] = [
    {value: 1, viewValue: 'Active'},
    {value: 2, viewValue: 'De-Active'}
  ];

  displayMultipleDays: IndexItem[] = [
    {value: 1, viewValue: 'Yes'},
    {value: 2, viewValue: 'No'},
  ];

  displayHourly: IndexItem[] = [
    {value: 0, viewValue: 'No'},
    {value: 1, viewValue: 'Yes'},
  ];
  
  displayDay: IndexItem[] = [
    {value: 1, viewValue: 'AM'},
    {value: 2, viewValue: 'PM'},
  ];

  displayHours: IndexItem[] = [
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
    {value: 12, viewValue: '12'}
  ];

  constructor(private durationService: DurationService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    //private captcha: Captcha,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService
    ) { 
      this.durationForm = fb.group({
        'durAct': [null, Validators.required],
        'durDtm': [null, Validators.required],
        'durEDay': [null, Validators.required],
        'durEtm': [null, Validators.required],
        'durHdr': [null, Validators.required],
        'durId': [null, Validators.required],
        'durMul': [null, Validators.required],
        'durSDay': [null, Validators.required],
        'durSeq': [null, Validators.required],
        'durStm': [null, Validators.required],
        'prdctDetId': [this.$prdctDetId],
        'evtId': [null, Validators.required],
        'adnlDurFlg': [null, Validators.required],
        'usrId': [this.userId],
        'captcha': [null, Validators.required]
      });
    }
 
  ngOnInit() {
    this.loadDurationById();
  }

  loadDurationById(){
    this.durationService.loadItemById(this.$prdctDetId, this.$attrId)
    .subscribe(result => {
      this.restItems = result;
      this.resultInfo = this.restItems.result;
      this.events = this.restItems.events;
    });
  }

  updateItems(){
   this.submitted = true;
       if (this.durationForm.invalid) {
        return;
      }

      this.http.post('ema/partner/duration-update', this.durationForm.value, {responseType: 'text'}).subscribe(res => {
        if (res === 'SUCCESS') {
          this.notificationService.onSuccess('Successfully Updated.');
          this.router.navigateByUrl('/venue/duration/show');
        } else {
          this.notificationService.onError('Oops! Something went wrong.');
        }
      });
    }

  goBack(){
    this.router.navigate(['/venue/duration/show']);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.durationForm.controls;
  }


}
