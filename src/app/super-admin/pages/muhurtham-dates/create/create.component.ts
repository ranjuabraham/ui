import {Component, OnInit, AfterViewInit, ChangeDetectorRef, forwardRef, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MuhurthamDatesService} from '../muhurtham-dates.service';
import {NotificationService} from '../../../shared/notification';

export interface SelectBox {
  value: number;
  viewValue: string;
}


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  loading: boolean;
  error: string;
  public createForm: FormGroup;
  searchSeq: FormControl;
  selectDates: SelectBox[] = [
    {value: 0, viewValue: 'Non-Muhurtham Day'},
    {value: 1, viewValue: 'Muhurtham Day'},
    {value: 2, viewValue: 'Special Day'}
  ];
  submitted = false;
  constructor(
    private muhurthamDatesService: MuhurthamDatesService,
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService,
  ) {
    // To initialize FormGroup
    this.createForm = fb.group({
      'muhurtDts': [null, Validators.required],
      'isMuh': [null, Validators.required],
      'captcha': [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  /** POST: add a new Muhurtham Dates to the database **/
  addMuhurthamDates() {
    this.submitted = true;
    // // stop here if form is invalid
    if (this.createForm.invalid) {
      return;
    }
    this.loading = true;
    this.muhurthamDatesService
      .addMuhurthamDates(this.createForm.value)
      .subscribe((value) => {
        this.notificationService.onSuccess('Successfully Added.');
        this.router.navigateByUrl('/admin/muhurtham-dates/create');
        this.loading = false;
      }, error => {
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
    this.router.navigate(['/admin/dashboard/show']);
  }
}
