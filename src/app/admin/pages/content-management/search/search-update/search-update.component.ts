import { ChangeDetectorRef, Component, OnInit, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
//import { HttpClient} from '@angular/common/http';
import { NotificationService} from '../../../../shared/notification';
import { Captcha} from '../../../../shared/captcha/captcha';
import { Search} from '../search';
import { SearchService} from '../search.service';
import { ActivatedRoute, Params, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
declare var hljs: any;

export interface IndexItem {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-search-update',
  templateUrl: './search-update.component.html',
  styleUrls: ['./search-update.component.scss']
})
export class SearchUpdateComponent implements OnInit {

  public searchForm: FormGroup;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public usrTypeId = JSON.parse(localStorage.getItem('userInfo')).usrTypeId;
  $prdctDetId  = this.route.snapshot.params['prdctDetId'];
  $attrId  = this.route.snapshot.params['attrId'];
  $catgId  = this.route.snapshot.params['catgId'];
  resultInfo: Search;
  master: any;
  category: any;
  restItems: any;
  message = '';
  siteKey: any;
  submitted = false;

  displayMap: IndexItem[] = [
    {value: 0, viewValue: 'Remove'},
    {value: 1, viewValue: 'Add'}
  ];
  constructor(private searchService: SearchService,

      private route: ActivatedRoute,
      private fb: FormBuilder,
      private router: Router,
      private http: HttpClient,
      //private captcha: Captcha,
      private cdr: ChangeDetectorRef,
      private notificationService: NotificationService){
      this.searchForm = fb.group({
        'action': ['update'],
        'prdctDetId': [this.$prdctDetId],
        'searchDetId': [null, Validators.required],
        'searchId': [null, Validators.required],
        'searchDesc': [''],
        'searchDetDesc': [''],
        'searchDetMap': [null, Validators.required],
        'usrId': [this.userId],
        'captcha': [null, Validators.required]
      });
    }

  ngOnInit() { 
    this.searchService.loadItemById(this.$prdctDetId, this.$catgId, this.$attrId)
    .subscribe(response => {  
      this.restItems = response; 
      this.master = this.restItems.master;
      this.category = this.restItems.category;
      this.resultInfo = this.restItems.result;
    });
  }

  updateItems(){
    this.submitted = true;
       if (this.searchForm.invalid) {
        return;
      }

      this.http.post('ema/partner/searcher-update', this.searchForm.value, {responseType: 'text'}).subscribe(res => {
        if (res === 'SUCCESS') {
          this.notificationService.onSuccess('Successfully Updated.');
          this.router.navigateByUrl('/venue/search/show');
        } else {
          this.notificationService.onError('Oops! Something went wrong.');
        }
      });

    }
    
    goBack(){
      this.router.navigate(['/venue/search/show']);
    } 
    
    // convenience getter for easy access to form fields
    get f() {
      return this.searchForm.controls;
    }



}
