import {Component, OnInit, AfterViewInit, ViewChild, AfterContentInit, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SearchCategoryService} from '../search-category.service';
import {SearchCategory} from '../search-category';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {NotificationService} from '../../../../shared/notification';

export interface SelectBox {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-search-edit',
  templateUrl: './search-edit.component.html',
  styleUrls: ['./search-edit.component.scss']
})
export class SearchEditComponent implements OnInit {
  loading: boolean;
  error: string;
  searchCategoryData: SearchCategory[];
  message = '';
  public searchCategoryForm: FormGroup;
  prdctSeq: FormControl;
  submitted = false;
  $searchId = this.route.snapshot.params['searchId'];
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
    private searchCategoryService: SearchCategoryService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService,
  ) {
    // To initialize FormGroup
    this.searchCategoryForm = fb.group({
      'searchDesc': [null, Validators.required],
      'searchSeq': [null, Validators.required],
      'searchAct': [null, Validators.required],
      'searchId': [null, Validators.required],
      'captcha': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getSearchCategoryById();
  }

  getSearchCategoryById() {
    console.log(this.$searchId);
    this.searchCategoryService.getSearchById(this.$searchId)
      .subscribe(heroes => this.searchCategoryData = heroes);
  }

  editSearchCategory() {
    this.submitted = true;
    // // stop here if form is invalid
    if (this.searchCategoryForm.invalid) {
      return;
    }
    this.loading = true;
    this.searchCategoryService
      .updateSearchCategory(this.searchCategoryForm.value)
      .subscribe((value) => {this.notificationService.onSuccess('Successfully Added.');
        this.router.navigateByUrl('/admin/search-category/show');
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
    return this.searchCategoryForm.controls;
  }

  goBack() {
    this.router.navigate(['/admin/search-category/show']);
  }

}
