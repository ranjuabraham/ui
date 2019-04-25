import { ChangeDetectorRef, Component, OnInit, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { NotificationService} from '../../../../shared/notification';
import { BuffetMasterService} from '../buffet-master.service';
import { BuffetMaster} from '../buffet-master';
import { ActivatedRoute, Params, Router} from '@angular/router';

export interface IndexItem {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-buffet-master-create',
  templateUrl: './buffet-master-create.component.html',
  styleUrls: ['./buffet-master-create.component.scss']
})
export class BuffetMasterCreateComponent implements OnInit {

  public buffetForm: FormGroup;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public usrTypeId = JSON.parse(localStorage.getItem('userInfo')).usrTypeId;
  restItems: any;
  resultInfo: BuffetMaster;
  foodItems: any;
  message = '';
  siteKey: any;
  submitted = false;
  
  displayStatus: IndexItem[] = [
    {value: 1, viewValue: 'Active'},
    {value: 2, viewValue: 'De-Active'}
  ];

  isChoosable: IndexItem[] = [
    {value: 0, viewValue: '--Select--'},
    {value: 1, viewValue: 'Yes'},
    {value: 2, viewValue: 'No'}
  ];

  constructor(private buffetMasterService: BuffetMasterService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService
    ) { 
      this.buffetForm = fb.group({
        'prdctDetId': [this.prdctDetId],
        'action': ['add'],
        'usrId': [this.userId],
        'buffId': ['0'],
        'fdTypId': [null, Validators.required],
        'buffDesc': [null, Validators.required],
        'buffComp': [''],
        'alwToChoose': [null, Validators.required],
        'buffCost': [null, Validators.required],
        'buffTax': ['0'],
        'discVal': ['0'],
        'leafCost': ['0'],
        'reserVal': ['0'],
        'buffAct':[null, Validators.required],
        'captcha': [null, Validators.required]
      });
    }

  ngOnInit() {
    this.buffetMasterService.loadFoodType(this.prdctDetId)
    .subscribe(response => {this.foodItems = response.result;
    });
  }

  updateItems(){
   this.submitted = true;
      if (this.buffetForm.invalid) {
      return;
    }

    this.http.post('ema/partner/buffet-master-update', this.buffetForm.value, {responseType: 'text'}).subscribe(res => {
      if (res === 'SUCCESS') {
        this.notificationService.onSuccess('Successfully Added.');
        this.goBack();
      } else {
        this.notificationService.onError('Oops! Something went wrong.');
      }
    });
  }

  goBack(){
    this.router.navigate(['/venue/buffet-master/show']);
  }

  get f() {
    return this.buffetForm.controls;
  }

 
}
