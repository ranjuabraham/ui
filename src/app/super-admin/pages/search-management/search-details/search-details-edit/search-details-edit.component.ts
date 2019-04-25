import {Component, OnInit, AfterViewInit, ViewChild, AfterContentInit, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {SearchDetails} from '../search-details';
import {SearchDetailsService} from '../search-details.service';
import {NotificationService} from '../../../../shared/notification';

export interface SelectBox {
  value: number;
  viewValue: string;
}


@Component({
  selector: 'app-search-details-edit',
  templateUrl: './search-details-edit.component.html',
  styleUrls: ['./search-details-edit.component.scss']
})
export class SearchDetailsEditComponent implements OnInit {
  loading: boolean;
  error: string;
  formData: SearchDetails[];
  message = '';
  public editForm: FormGroup;
  prdctSeq: FormControl;
  submitted = false;
  searchType: SearchDetails[] = [];
  $searchDetId = this.route.snapshot.params['searchDetId'];
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
  constructor(
    private searchDetailsService: SearchDetailsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService,
  ) {
    // To initialize FormGroup
    this.editForm = fb.group({
      'searchDetId': [null, Validators.required],
      'searchId': [null, Validators.required],
      'searchDetDesc': [null, Validators.required],
      'searchDetSeq': [null, Validators.required],
      'searchDetAct': [null, Validators.required],
      'captcha': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getSearchDetailsById();
    this.getSearchType();
  }

  // Search Management Type from server
  getSearchType() {
    this.searchDetailsService.getSearchType()
      .subscribe(type => {
        this.searchType = type;
        console.log(this.searchType);
      });
  }
  getSearchDetailsById() {
    console.log(this.$searchDetId);
    this.searchDetailsService.getDetailsById(this.$searchDetId)
      .subscribe(data => this.formData = data);
  }

  editSearchDetails() {
    this.submitted = true;
    // // stop here if form is invalid
    if (this.editForm.invalid) {
      return;
    }
    this.loading = true;
    this.searchDetailsService
      .updateSearchDetails(this.editForm.value)
      .subscribe((value) => {this.notificationService.onSuccess('Successfully Added.');
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
    return this.editForm.controls;
  }

  // end google captcha
  goBack() {
    this.router.navigate(['/admin/search-details/show']);
  }

}
