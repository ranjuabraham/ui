import {Component, OnInit, AfterViewInit, ViewChild, AfterContentInit, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {VenueCategoryService} from '../venue-category.service';
import {VenueCategory} from '../venue-category';
import {ActivatedRoute, Params, Router} from '@angular/router';



import {NotificationService} from '../../../../shared/notification';


export interface VenueCategoryItem {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-venue-category-edit',
  templateUrl: './venue-category-edit.component.html',
  styleUrls: ['./venue-category-edit.component.scss']
})
export class VenueCategoryEditComponent implements OnInit {
  loading: boolean;
  error: string;
  venueCategoryData: VenueCategory[];
  message = '';
  public venueCategoryForm: FormGroup;
  submitted = false;
  $prdctId = this.route.snapshot.params['prdctId'];
  displaySequence: VenueCategoryItem[] = [
    {value: 1, viewValue: '1'},
    {value: 2, viewValue: '2'},
    {value: 3, viewValue: '3'},
    {value: 4, viewValue: '4'},
    {value: 5, viewValue: '5'},
    {value: 6, viewValue: '6'},
    {value: 7, viewValue: '7'},
  ];
  displayStatus: VenueCategoryItem[] = [
    {value: 1, viewValue: 'Active'},
    {value: 2, viewValue: 'De-Active'}
  ];

  constructor(
    private venueCategoryService: VenueCategoryService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService,
  ) {
    // To initialize FormGroup
    this.venueCategoryForm = fb.group({
      'prdctDesc': [null, Validators.required],
      'prdctSeq': [null, Validators.required],
      'prdctAct': [null, Validators.required],
      'prdctId': [null, Validators.required],
      'captcha': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getVenueCategoryById();
  }

  getVenueCategoryById() {
    // console.log(this.$prdctId);
    this.venueCategoryService.getVenueById(this.$prdctId)
      .subscribe(res => this.venueCategoryData = res);
  }

  editVenueCategory() {
    this.submitted = true;
    // // stop here if form is invalid
    if (this.venueCategoryForm.invalid) {
      return;
    }
    this.loading = true;
    this.venueCategoryService
      .updateVenueCategory(this.venueCategoryForm.value)
      .subscribe((value) => { this.notificationService.onSuccess('Successfully Updated.');
        this.router.navigateByUrl('/admin/venue-category/show');
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
    return this.venueCategoryForm.controls;
  }
  goBack() {
    this.router.navigate(['/admin/venue-category/show']);
  }

}
