import { ChangeDetectorRef, Component, OnInit, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { NotificationService} from '../../../../shared/notification';
import { BuffetCategoryService} from '../buffet-category.service';
import { BuffetCategory} from '../buffet-category';
import { ActivatedRoute, Params, Router} from '@angular/router';


export interface IndexItem {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-buffet-category-create',
  templateUrl: './buffet-category-create.component.html',
  styleUrls: ['./buffet-category-create.component.scss']
})
export class BuffetCategoryCreateComponent implements OnInit {

  public buffetForm: FormGroup;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public usrTypeId = JSON.parse(localStorage.getItem('userInfo')).usrTypeId;
  restItems: any;
  resultInfo: BuffetCategory;
  foodItems: any;
  message = '';
  siteKey: any;
  submitted = false;
  
  displayStatus: IndexItem[] = [
    {value: 1, viewValue: 'Active'},
    {value: 2, viewValue: 'De-Active'}
  ];

  displayLiveCounter: IndexItem[] = [
    {value: 2, viewValue: 'No'},
    {value: 1, viewValue: 'Yes'}
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

  displayItems: IndexItem[] = [
    {value: 0, viewValue: 'All'},
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
    {value: 88, viewValue: 'Leaf Service / TCs'},
    {value: 99, viewValue: 'LIve Counter'},
  ];

  constructor(private buffetCategoryService: BuffetCategoryService,
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
        'buffSubId': ['0'],
        'fdTypId': [null, Validators.required],
        'buffSubHdr': [null, Validators.required],
        'buffSubDesc': [''],
        'isFlg': [null, Validators.required],
        'alwToChoose': [null, Validators.required],
        'buffSubSeq': [null, Validators.required],
        'buffSubAct':[null, Validators.required],
        'captcha': [null, Validators.required]
      });
    }

  ngOnInit() {
    this.buffetCategoryService.loadFoodType(this.prdctDetId)
    .subscribe(response => {this.foodItems = response.result;
    });
  }

  updateItems(){
   this.submitted = true;
      if (this.buffetForm.invalid) {
       return;
      }

      this.http.post('ema/partner/buffet-category-update', this.buffetForm.value, {responseType: 'text'}).subscribe(res => {
        if (res === 'SUCCESS') {
          this.notificationService.onSuccess('Successfully Added.');
          this.goBack();
        } else {
          this.notificationService.onError('Oops! Something went wrong.');
        }
      });
    }

  goBack(){
    this.router.navigate(['/venue/buffet-category/show']);
  }

  get f() {
    return this.buffetForm.controls;
  }


}
