import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef, OnInit,
  ViewChild
} from '@angular/core';
import {VenueCategoryService} from '../venue-category.service';
import {VenueCategoryItem} from '../venue-category-edit/venue-category-edit.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NotificationService} from '../../../../shared';
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-venue-category-create',
  templateUrl: './venue-category-create.component.html',
  styleUrls: ['./venue-category-create.component.scss']
})
export class VenueCategoryCreateComponent implements OnInit, AfterViewInit {
  loading: boolean;
  error: string;
  message = '';
  public venueCategoryForm: FormGroup;
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
  submitted = false;

  constructor(
    private venueCategoryService: VenueCategoryService,
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {
    // To initialize FormGroup
    this.venueCategoryForm = fb.group({
      'prdctId': ['0', Validators.required],
      'prdctDesc': [null, Validators.required],
      'prdctSeq': [null, Validators.required],
      'prdctAct': [null, Validators.required],
      'captcha': ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

  ///// Save Method //////
  /** POST: add a new venue category to the database **/
  addVenueCategory() {
    this.submitted = true;
    // // stop here if form is invalid
    if (this.venueCategoryForm.invalid) {
      return;
    }
    this.loading = true;
    this.venueCategoryService
      .addVenueCategory(this.venueCategoryForm.value)
      .subscribe((value) => {
        console.log(value);
        this.notificationService.onSuccess('Successfully Added.');
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
