import { ChangeDetectorRef, Component, OnInit, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { NotificationService} from '../../../../shared/notification';
import {Captcha} from '../../../../shared/captcha/captcha';
import { FoodTypeService} from '../food-type.service';
import { FoodType} from '../food-type';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { StatusItem} from '../food-type-update/food-type-update.component';
declare var hljs: any;

@Component({
  selector: 'app-food-type-create',
  templateUrl: './food-type-create.component.html',
  styleUrls: ['./food-type-create.component.scss']
})
export class FoodTypeCreateComponent implements OnInit {
  public foodTypeForm: FormGroup;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public usrTypeId = JSON.parse(localStorage.getItem('userInfo')).usrTypeId;
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
    'action' : ['add'],
    'prdctDetId': [this.prdctDetId],
    'fdTypId': [0],
    'fdTypHdr': [null, Validators.required],
    'fdTypSeq':[null, Validators.required],
    'fdTypAct': [null, Validators.required],
    'usrId': [this.userId],
    'captcha': [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  updateItems(){
    this.submitted = true;
       if (this.foodTypeForm.invalid) {
        return;
      }

      this.http.post('ema/partner/foodType-update', this.foodTypeForm.value, {responseType: 'text'}).subscribe(res => {
        if (res === 'SUCCESS') {
          this.notificationService.onSuccess('Successfully Added.');
          this.router.navigateByUrl('/venue/food-type/show');
        } else {
          this.notificationService.onError('Oops! Something went wrong.');
        }
      });
    }

    goBack(){
      this.router.navigate(['/venue/food-type/show']);
    } 

    get f() {
      return this.foodTypeForm.controls;
    }


}
