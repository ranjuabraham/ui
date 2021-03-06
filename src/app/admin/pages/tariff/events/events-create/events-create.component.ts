import { ChangeDetectorRef, Component, OnInit, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { NotificationService} from '../../../../shared/notification';
import {Captcha} from '../../../../shared/captcha/captcha';
import { EventsService} from '../events.service';
import { Events} from '../events';
import { ActivatedRoute, Params, Router} from '@angular/router';
declare var hljs: any;

export interface StatusItem {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-events-create',
  templateUrl: './events-create.component.html',
  styleUrls: ['./events-create.component.scss']
})
export class EventsCreateComponent implements OnInit {
  public eventsForm: FormGroup;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public usrTypeId = JSON.parse(localStorage.getItem('userInfo')).usrTypeId;
  resultInfo: Events;
  hallList: any;
  message = '';
  siteKey: any;
  submitted = false;

  displayStatus: StatusItem[] = [
    {value: 1, viewValue: 'Active'},
    {value: 2, viewValue: 'De-Active'}
  ];

  displaySequence: StatusItem[] = [
    {value: 1, viewValue: '1'},
    {value: 2, viewValue: '2'},
    {value: 3, viewValue: '3'},
    {value: 4, viewValue: '4'},
    {value: 5, viewValue: '5'},
    {value: 6, viewValue: '6'},
    {value: 7, viewValue: '7'}
  ];
  displayDays: StatusItem[] = [
    {value: 0, viewValue: 'All Days'},
    {value: 1, viewValue: 'Muhurtham Days Only'},
    {value: 2, viewValue: 'Non Muhurtham Only'}
  ];

    constructor(
      private eventService: EventsService,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private router: Router,
      private http: HttpClient,
      //private captcha: Captcha,
      private cdr: ChangeDetectorRef,
      private notificationService: NotificationService,
    ) { 
        this.eventsForm = fb.group({
        'action' : ['update'],
        'prdctDetId': [this.prdctDetId],
        'subPrdctDetId': [0],
        'evtId': [0],
        'evtHdr': [null, Validators.required],
        'evtShwFor':[null, Validators.required],
        'evtSeq': [null, Validators.required],
        'evtAct': [null, Validators.required],
        'usrId': [this.userId],
        'captcha': [null, Validators.required]
      });
}

  ngOnInit() {
    this.eventService.loadHallList(this.prdctDetId)
    .subscribe(response => {this.hallList = response;
    //console.log(this.hallList);
    });
  }

  updateItems(){
      this.submitted = true;
         if (this.eventsForm.invalid) {
          alert('Some fields are missing');
          return;
        }

        this.http.post('ema/partner/events-update', this.eventsForm.value, {responseType: 'text'}).subscribe(res => {
          if (res === 'SUCCESS') {
            this.notificationService.onSuccess('Successfully Added.');
            this.router.navigateByUrl('/venue/events/show');
          } else {
            this.notificationService.onError('Oops! Something went wrong.');
          }
        });
      }

      goBack(){
        this.router.navigate(['/venue/events/show']);
      } 

      // convenience getter for easy access to form fields
      get f() {
        return this.eventsForm.controls;
      }
 
}
