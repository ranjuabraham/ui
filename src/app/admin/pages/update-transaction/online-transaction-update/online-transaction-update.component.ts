import { ChangeDetectorRef, Component, OnInit, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { NotificationService} from '../../../shared/notification';
import { UpdateTransactionService} from '../update-transaction.service';
import { UpdateTransaction} from '../update-transaction';
import { ActivatedRoute, Params, Router} from '@angular/router';

export interface IndexItem {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-online-transaction-update',
  templateUrl: './online-transaction-update.component.html',
  styleUrls: ['./online-transaction-update.component.scss']
})
export class OnlineTransactionUpdateComponent implements OnInit {

  public transactionForm: FormGroup;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public usrTypeId = JSON.parse(localStorage.getItem('userInfo')).usrTypeId;
  $prdctDetId  = this.route.snapshot.params['prdctDetId'];
  $attrId  = this.route.snapshot.params['txnId'];
  $blockType  = this.route.snapshot.params['blockType'];
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
  blockType: number = 1;
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
      'action' : ['online'],
      'prdctDetId': [this.prdctDetId],
      'apprId': [this.userId],
      'usrId': [null, Validators.required],
      'usrTypId': [this.usrTypeId],
      'txnId': [null, Validators.required],
      'status': [null, Validators.required],
      'captcha': [null, Validators.required]
    });
  }

  ngOnInit() {
    this.transactionService.loadTransactionById(this.$prdctDetId, this.$attrId)
    .subscribe(result => {
      this.resultInfo = result;
      this.eventTypeName = this.resultInfo.bookTyp.toLowerCase();
      if(this.eventTypeName === 'buffet')
      {
        this.buffetFlag = 1;
      }
      if(this.buffetFlag == 1)
      {
        this.rentAmount = (+this.resultInfo.buffTar) * (+this.resultInfo.buffCount);
        this.subAmount = (+this.rentAmount) - (+this.resultInfo.disAmount);
      }else {
            this.subAmount = (+this.resultInfo.rentFinal) - (+this.resultInfo.disAmount);
      }
    });
  }

  updateItems(){
    this.submitted = true;
      if (this.transactionForm.invalid) {
        return;
      }
      this.http.post('ema/partner/update-transaction', this.transactionForm.value, {responseType: 'text'}).subscribe(res => {
        if (res === 'SUCCESS') {
          this.notificationService.onSuccess('Successfully Updated.');
          this.goBack(this.$blockType);
        } else {
          this.notificationService.onError('Oops! Something went wrong.');
        }
      });
    }
    
    goBack(blkType: number)
    {
      if(blkType === 2)
      {
        this.router.navigate(['/venue/update-transaction/online-reservations']);
      }
      else{
        this.router.navigate(['/venue/update-transaction/online-bookings']);
      }
    }

    get f() {
      return this.transactionForm.controls;
    }
}
