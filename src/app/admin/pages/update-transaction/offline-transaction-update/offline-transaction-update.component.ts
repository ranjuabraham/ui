import { ChangeDetectorRef, Component, OnInit, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { NotificationService} from '../../../shared/notification';
import { UpdateTransactionService} from '../update-transaction.service';
import { UpdateTransaction} from '../update-transaction';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { APP_ID_RANDOM_PROVIDER } from '@angular/core/src/application_tokens';
import { ApprovalRequestComponent } from 'src/app/users/pages/checkout/approval-request/approval-request.component';

export interface IndexItem {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-offline-transaction-update',
  templateUrl: './offline-transaction-update.component.html',
  styleUrls: ['./offline-transaction-update.component.scss']
})

export class OfflineTransactionUpdateComponent implements OnInit {

  public transactionForm: FormGroup;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public usrTypeId = JSON.parse(localStorage.getItem('userInfo')).usrTypeId;
  $prdctDetId  = this.route.snapshot.params['prdctDetId'];
  $attrId  = this.route.snapshot.params['txnId'];
  restItems: any;
  resultInfo: UpdateTransaction;
  message = '';
  siteKey: any;
  submitted = false;
  statFlag: string = 'Approved';
  rentAmount: number;
  taxAmount: number;
  taxValue: number;
  discValue: number;
  discAmount: number;
  subAmount: number;
  totalAmount: number;
  buffetCount: number;
  buffetCost: number;
  tariff: number;
  buffetFlag: number = 0;
  eventTypeName: string;
  
  displayStatus: IndexItem[] = [
    {value: 'Approved', viewValue: 'Approved'},
    {value: 'Cancelled', viewValue: 'Cancelled'}
  ];

  constructor(
    private transactionService: UpdateTransactionService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService,
  ) { 
    this.transactionForm = fb.group({
      'action' : ['offline'],
      'prdctDetId': [this.prdctDetId],
      'apprId': [this.userId],
      'txnId': [null, Validators.required],
      'rentFinal': ['0'],
      'disAmount': ['0'],
      'taxesFinal': ['0'],
      'buffCount': ['0'],
      'buffTar': ['0'],
      'buffFinal': ['0'],
      'totalFinal': ['0'],
      'status': [null, Validators.required],
      'captcha': [null, Validators.required]
    });
  }

  ngOnInit() {
    this.transactionService.loadTransactionById(this.$prdctDetId, this.$attrId)
    .subscribe(result => {
      console.log('result');
      this.resultInfo = result;
      this.rentAmount = this.resultInfo.rentFinal;
      this.discAmount = this.resultInfo.disAmount;
      this.taxAmount = this.resultInfo.taxesFinal;
      this.totalAmount = this.resultInfo.totalFinal;
      this.buffetCount = this.resultInfo.buffCount;
      this.buffetCost =  this.resultInfo.buffTar;
      this.taxValue = this.resultInfo.servChrg;
      this.discValue = this.discValue;
      this.eventTypeName = this.resultInfo.bookedBy.toLowerCase();
      if(this.eventTypeName === 'buffet')
      {
        this.buffetFlag = 1;
      }
    });
  }

  updateItems(){
    this.submitted = true;
      console.log(this.transactionForm.value);
      if (this.transactionForm.invalid) {
        return;
      }
      this.http.post('ema/partner/update-transaction', this.transactionForm.value, {responseType: 'text'}).subscribe(res => {
        if (res === 'SUCCESS') {
          this.notificationService.onSuccess('Successfully Updated.');
          this.goBack();
        } else {
          this.notificationService.onError('Oops! Something went wrong.');
        }
      });
    }
    calculate(){
      this.buffetCount = this.buffetCount;
      this.buffetCost = this.buffetCost;
      this.tariff = (+this.buffetCount) * (+this.buffetCost);
      this.discAmount = this.discAmount;
      this.subAmount =  this.tariff - (+this.discAmount);
      this.taxAmount = (this.subAmount * this.taxValue ) / 100;
      this.totalAmount = this.subAmount + (+this.taxAmount);
    }

    calculateSum(){
      this.rentAmount = this.rentAmount;
      this.discAmount = this.discAmount;
      this.subAmount =  this.rentAmount - (+this.discAmount);
      this.taxAmount = (this.subAmount * this.taxValue ) / 100;
      this.totalAmount = this.subAmount + (+this.taxAmount);
    }

    goBack(){
      this.router.navigate(['/venue/update-trasaction/offline-transaction']);
    } 

    get f() {
      return this.transactionForm.controls;
    }

}
