import {Component, OnInit, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import {SearchCategoryService} from '../search-category.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NotificationService} from '../../../../shared/notification';

export interface SearchCategoryItem {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-search-create',
  templateUrl: './search-create.component.html',
  styleUrls: ['./search-create.component.scss']
})
export class SearchCreateComponent implements OnInit {
  loading: boolean;
  error: string;
  public searchCategoryForm: FormGroup;
  searchSeq: FormControl;
  displaySequence: SearchCategoryItem[] = [
    {value: 1, viewValue: '1'},
    {value: 2, viewValue: '2'},
    {value: 3, viewValue: '3'},
    {value: 4, viewValue: '4'},
    {value: 5, viewValue: '5'},
    {value: 6, viewValue: '6'},
    {value: 7, viewValue: '7'},
  ];
  displayStatus: SearchCategoryItem[] = [
    {value: 1, viewValue: 'Active'},
    {value: 2, viewValue: 'De-Active'}
  ];
  submitted = false;
  constructor(
    private searchCategoryService: SearchCategoryService,
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService,
  ) {
    // To initialize FormGroup
    this.searchCategoryForm = fb.group({
      'searchId': ['0', Validators.required],
      'searchDesc': [null, Validators.required],
      'searchSeq': [null, Validators.required],
      'searchAct': [null, Validators.required],
      'captcha': ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  addSearchCategory() {
    this.submitted = true;
    // // stop here if form is invalid
    if (this.searchCategoryForm.invalid) {
      return;
    }
    this.loading = true;
    this.searchCategoryService
      .addSearchCategory(this.searchCategoryForm.value)
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
