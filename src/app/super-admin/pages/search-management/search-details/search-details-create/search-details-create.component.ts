import {Component, OnInit, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {SearchDetailsService} from '../search-details.service';

import {NotificationService} from '../../../../shared/notification';


export interface SelectBox {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-search-details-create',
  templateUrl: './search-details-create.component.html',
  styleUrls: ['./search-details-create.component.scss']
})
export class SearchDetailsCreateComponent implements OnInit {
  loading: boolean;
  error: string;
  public createForm: FormGroup;
  searchSeq: FormControl;
  displaySequence: SelectBox[] = [
    {value: 1, viewValue: '1'},
    {value: 2, viewValue: '2'},
    {value: 3, viewValue: '3'},
    {value: 4, viewValue: '4'},
    {value: 5, viewValue: '5'},
    {value: 6, viewValue: '6'},
    {value: 7, viewValue: '7'},
  ];
  displayStatus: SelectBox[] = [
    {value: 1, viewValue: 'Active'},
    {value: 2, viewValue: 'De-Active'}
  ];
  submitted = false;
  searchType: any;

  constructor(
    private searchDetailsService: SearchDetailsService,
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService,
  ) {
    // To initialize FormGroup
    this.createForm = fb.group({
      'searchDetId': ['0', Validators.required],
      'searchId': [null, Validators.required],
      'searchDetDesc': [null, Validators.required],
      'searchDetSeq': [null, Validators.required],
      'searchDetAct': [null, Validators.required],
      'captcha': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getSearchType();
  }

  // Search Management Type from server
  getSearchType() {
    this.searchDetailsService.getSearchType()
      .subscribe(type => {
        this.searchType = type;
      });
  }

  /** POST: add a new Search Details to the database **/
  addSearchDetails() {
    this.submitted = true;
    // // stop here if form is invalid
    if (this.createForm.invalid) {
      return;
    }
    this.loading = true;
    this.searchDetailsService
      .addSearchDetails(this.createForm.value)
      .subscribe((value) => {
        this.notificationService.onSuccess('Successfully Added.');
        this.router.navigateByUrl('/admin/search-details/show');
          this.loading = false;
        },
        error => {
          this.notificationService.onError('Oops! Something went wrong.');
          this.error = error;
          this.loading = false;
        });
  }
// convenience getter for easy access to form fields
  get f() {
    return this.createForm.controls;
  }

  goBack() {
    this.router.navigate(['/admin/search-details/show']);
  }
}
