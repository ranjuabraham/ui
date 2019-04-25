import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FacilityCategoryService} from '../facility-category.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FacilityCategory} from '../facility-category';
import {NotificationService} from '../../../../shared/notification';

export interface FacilityCategoryItem {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-facility-edit',
  templateUrl: './facility-edit.component.html',
  styleUrls: ['./facility-edit.component.scss']
})
export class FacilityEditComponent implements OnInit {
  loading: boolean;
  error: string;
  facilityCategoryData: FacilityCategory[];
  message = '';
  public facilityCategoryForm: FormGroup;
  displaySequence: FacilityCategoryItem[] = [
    {value: 1, viewValue: '1'},
    {value: 2, viewValue: '2'},
    {value: 3, viewValue: '3'},
    {value: 4, viewValue: '4'},
    {value: 5, viewValue: '5'},
    {value: 6, viewValue: '6'},
    {value: 7, viewValue: '7'},
  ];
  displayStatus: FacilityCategoryItem[] = [
    {value: 1, viewValue: 'Active'},
    {value: 2, viewValue: 'De-Active'}
  ];
  submitted = false;
  $facId = this.route.snapshot.params['facId'];

  constructor(
    private facilityCategoryService: FacilityCategoryService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService
  ) {
    // To initialize FormGroup
    this.facilityCategoryForm = fb.group({
      'facId': ['0', Validators.required],
      'facSupAct': [null, Validators.required],
      'facSupHdr': [null, Validators.required],
      'captcha': [null, Validators.required],
    });
  }

  ngOnInit() {
    this.getFacilitiesCategoryById();
  }

  getFacilitiesCategoryById() {
    this.facilityCategoryService.getFacilityById(this.$facId)
      .subscribe(res => this.facilityCategoryData = res);
  }

  editFacilitiesCategory() {
    this.submitted = true;
    // // stop here if form is invalid
    if (this.facilityCategoryForm.invalid) {
      return;
    }
    this.loading = true;
    this.facilityCategoryService
      .updateFacilityCategory(this.facilityCategoryForm.value)
      .subscribe((res) => {
          this.notificationService.onSuccess('Successfully Updated.');
          this.router.navigateByUrl('/admin/facilities-category/show');
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
    return this.facilityCategoryForm.controls;
  }

  goBack() {
    this.router.navigate(['/admin/facilities-category/show']);
  }
}
