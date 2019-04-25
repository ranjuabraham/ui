import { ChangeDetectorRef, Component, OnInit, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { NotificationService} from '../../../../shared/notification';
import { BuffetItemsService} from '../buffet-items.service';
import { BuffetItems} from '../buffet-items';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { MatSelectChange } from '@angular/material';

export interface IndexItem {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-buffet-items-create',
  templateUrl: './buffet-items-create.component.html',
  styleUrls: ['./buffet-items-create.component.scss']
})
export class BuffetItemsCreateComponent implements OnInit {
  public buffetForm: FormGroup;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public usrTypeId = JSON.parse(localStorage.getItem('userInfo')).usrTypeId;
  restItems: any;
  resultInfo: BuffetItems;
  foodItems: any;
  master: any;
  category: any;
  message = '';
  siteKey: any;
  submitted = false;
  
  displayStatus: IndexItem[] = [
    {value: 1, viewValue: 'Active'},
    {value: 2, viewValue: 'De-Active'}
  ];

  displaySequence: IndexItem[] = [
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

  constructor(private buffetItemsService: BuffetItemsService,
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
        'fdMenuId': ['0'],
        'fdTypId': [null, Validators.required],
        'fdDesc': [null, Validators.required],
        'buffSubId': [null, Validators.required],
        'buffId': [null, Validators.required],
        'fdDescSeq': [null, Validators.required],
        'fdDescAct':[null, Validators.required],
        'captcha': [null, Validators.required]
      });
    }

  ngOnInit() {
    this.loadBuffetMaster(this.prdctDetId, 0);
  }

  loadBuffetCategory(event: MatSelectChange){
    const catgId = JSON.parse(event.value);
    this.loadBuffetMaster(this.prdctDetId, catgId);
  }

  loadBuffetMaster(prdctDetId: number, catgId:number){
    this.buffetItemsService.loadItemsMaster(prdctDetId, catgId)
    .subscribe(result => {
      this.restItems = result;
      this.foodItems = this.restItems.foodType;
      this.master = this.restItems.master;
      this.category = this.restItems.category;
    });
  }

  updateItems(){
   this.submitted = true;
       if (this.buffetForm.invalid) {
        return;
      }

      this.http.post('ema/partner/buffet-items-update', this.buffetForm.value, {responseType: 'text'}).subscribe(res => {
        if (res === 'SUCCESS') {
          this.notificationService.onSuccess('Successfully Added.');
          this.goBack();
        } else {
          this.notificationService.onError('Oops! Something went wrong.');
        }
      });
    }

  goBack(){
    this.router.navigate(['/venue/buffet-items/show']);
  }

  get f() {
    return this.buffetForm.controls;
  }


}
