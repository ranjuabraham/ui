import {Component, OnInit, AfterViewInit, ViewChild, AfterContentInit, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NotificationService} from '../../../../shared/notification';

import {VenueDetailsService} from '../venue-details.service';
import {VenueDetails} from '../venue-details';

export interface VenueDetailsItem {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-venue-details-edit',
  templateUrl: './venue-details-edit.component.html',
  styleUrls: ['./venue-details-edit.component.scss']
})
export class VenueDetailsEditComponent implements OnInit {
  loading: boolean;
  error: string;
  venueDetailsData: VenueDetails[];
  message = '';
  public editForm: FormGroup;
  submitted = false;
  venueType: VenueDetails[] = [];

  startDate: '03/09/2018';
  $prdctDetId = this.route.snapshot.params['prdctDetId'];
  displaySequence: VenueDetailsItem[] = [
    {value: 1, viewValue: '1'},
    {value: 2, viewValue: '2'},
    {value: 3, viewValue: '3'},
    {value: 4, viewValue: '4'},
    {value: 5, viewValue: '5'},
    {value: 6, viewValue: '6'},
    {value: 7, viewValue: '7'},
  ];
  displayStatus: VenueDetailsItem[] = [
    {value: 1, viewValue: 'Active'},
    {value: 2, viewValue: 'De-Active'}
  ];
  isListed: VenueDetailsItem[] = [
    {value: 1, viewValue: 'Yes'},
    {value: 2, viewValue: 'No'}
  ];
  BookingType: VenueDetailsItem[] = [
    {value: 0, viewValue: 'Rent Basis'},
    {value: 1, viewValue: 'Hourly Basis'},
    {value: 2, viewValue: 'Buffet Basis'},
    {value: 3, viewValue: 'All the above'}
  ];

  constructor(
    private venueDetailsService: VenueDetailsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService,
  ) {
    // To initialize FormGroup
    this.editForm = fb.group({
      'prdctId': [null, Validators.required],
      'prdctDetId': [null, Validators.required],
      'prdctDetDesc': [null, Validators.required],
      'prdctIsListed': [null, Validators.required],
      'prdctIsDet': [null, Validators.required],
      'prdctDetURL': [''],
      'prdctIsWeb': [null, Validators.required],
      'prdctWebURL': [''],
      'prdctDetSeq': [null, Validators.required],
      'prdctDetAct': [null, Validators.required],
      'prdctStDt': [null, Validators.required],
      'prdctEdDt': [null, Validators.required],
      'prdctRefPct': [null, Validators.required],
      'alwBookType': [null, Validators.required],
      'captcha': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getVenueDetailsById();
    this.getVenueType();
  }

  // Venue Type from server
  getVenueType() {
    this.venueDetailsService.getVenueType()
      .subscribe(type => {
        this.venueType = type;
      });
  }

  getVenueDetailsById() {
    this.venueDetailsService.getVenueById(this.$prdctDetId)
      .subscribe(res => this.venueDetailsData = res);
  }

  editVenueDetails() {
    this.submitted = true;
    // // stop here if form is invalid
    if (this.editForm.invalid) {
      return;
    }
    this.loading = true;
    this.venueDetailsService
      .updateVenueDetails(this.editForm.value)
      .subscribe((value) => {
        this.notificationService.onSuccess('Successfully Updated.');
        this.router.navigateByUrl('/admin/venue-details/show');
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
    this.router.navigate(['/admin/venue-category/show']);
  }

}
