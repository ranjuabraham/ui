import { ChangeDetectorRef, Component, OnInit, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { NotificationService} from '../../../../shared/notification';
import {Captcha} from '../../../../shared/captcha/captcha';
import { FoodTypeService} from '../food-type.service';
import { FoodType} from '../food-type';
import { ActivatedRoute, Params, Router} from '@angular/router';
declare var hljs: any;

export interface StatusItem {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-food-type-update',
  templateUrl: './food-type-update.component.html',
  styleUrls: ['./food-type-update.component.scss']
})
export class FoodTypeUpdateComponent implements OnInit {
  public foodTypeForm: FormGroup;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public usrTypeId = JSON.parse(localStorage.getItem('userInfo')).usrTypeId;
  $prdctDetId  = this.route.snapshot.params['prdctDetId'];
  $foodTypeId  = this.route.snapshot.params['foodTypId'];
  resultInfo: FoodType;
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

  constructor(
    private foodTypeService: FoodTypeService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    //private captcha: Captcha,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService,
  ) {
    this.foodTypeForm = fb.group({
    'action' : ['update'],
    'prdctDetId': [this.$prdctDetId],
    'fdTypId': [null, Validators.required],
    'fdTypHdr': [null, Validators.required],
    'fdTypSeq':[null, Validators.required],
    'fdTypAct': [null, Validators.required],
    'usrId': [this.userId],
    'captcha': [null, Validators.required]
    });
  }

  ngOnInit() {
    this.loadFoodTypeById();
  }

  loadFoodTypeById(){
    this.foodTypeService.loadItemById(this.$prdctDetId, this.$foodTypeId)
    .subscribe(response => {  this.resultInfo = response;});
  }

  updateItems() {
    this.submitted = true;
       if (this.foodTypeForm.invalid) {
        return;
      }

      this.http.post('ema/partner/foodType-update', this.foodTypeForm.value, {responseType: 'text'}).subscribe(res => {
        if (res === 'SUCCESS') {
          this.notificationService.onSuccess('Successfully Updated.');
          this.router.navigateByUrl('/venue/food-type/show');
        } else {
          this.notificationService.onError('Oops! Something went wrong.');
        }
      });
    }

    goBack(){
      this.router.navigate(['/venue/food-type/show']);
    } 

    // convenience getter for easy access to form fields
    get f() {
      return this.foodTypeForm.controls;
    }
 

}
