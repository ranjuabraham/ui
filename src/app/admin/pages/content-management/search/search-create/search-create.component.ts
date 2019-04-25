import { ChangeDetectorRef, Component, OnInit, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
//import { HttpClient} from '@angular/common/http';
import { NotificationService} from '../../../../shared/notification';
//import { Captcha} from '../../../../shared/captcha/captcha';
import { Search} from '../search';
import { SearchService} from '../search.service';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { MatSelectChange } from '@angular/material';
import { HttpClient } from '@angular/common/http';
declare var hljs: any;

export interface IndexItem {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-search-create',
  templateUrl: './search-create.component.html',
  styleUrls: ['./search-create.component.scss']
})
export class SearchCreateComponent implements OnInit {

  public searchForm: FormGroup;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public usrTypeId = JSON.parse(localStorage.getItem('userInfo')).usrTypeId;
  resultInfo: Search;
  master: any;
  category: any;
  restItems: any;
  searchMap: number = 1;
  message = '';
  siteKey: any;
  submitted = false;

  displayMap: IndexItem[] = [
    {value: 1, viewValue: 'Add'}
  ];
  constructor(private searchService: SearchService,

      private route: ActivatedRoute,
      private fb: FormBuilder,
      private router: Router,
      private cdr: ChangeDetectorRef,
      private http: HttpClient,
      private notificationService: NotificationService){
      this.searchForm = fb.group({
        'action': ['add'],
        'prdctDetId': [this.prdctDetId],
        'searchDetId': [null, Validators.required],
        'searchId': [null, Validators.required],
        'searchDetMap': [null, Validators.required],
        'usrId': [this.userId],
        'captcha': [null, Validators.required]

      });
    }

  ngOnInit() { 
     this.searchService.loadMasters(this.prdctDetId, 0)
     .subscribe(response => {  
       this.restItems = response; 
       this.master = this.restItems.master;
        this.category = this.restItems.category;
     });
  }

  updateItems() {
    this.submitted = true;
       if (this.searchForm.invalid) {
        return;
      }

      this.http.post('ema/partner/searcher-update', this.searchForm.value, {responseType: 'text'}).subscribe(res => {
        if (res === 'SUCCESS') {
          this.notificationService.onSuccess('Successfully Added.');
          this.router.navigateByUrl('/venue/search/show');
        } else {
          this.notificationService.onError('Oops! Something went wrong.');
        }
      });
    }

    loadMasterDetails(event: MatSelectChange){
      const catgId = JSON.parse(event.value);
      this.searchService.loadMasters(this.prdctDetId, catgId)
      .subscribe(response => {  
        this.restItems = response; 
        this.master = this.restItems.master;
        this.category = this.restItems.category;
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
