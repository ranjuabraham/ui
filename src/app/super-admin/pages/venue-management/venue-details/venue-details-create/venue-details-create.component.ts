import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {VenueDetails} from '../venue-details';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VenueDetailsService} from '../venue-details.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../../../shared/notification';
import {VenueDetailsItem} from '../venue-details-edit/venue-details-edit.component';

@Component({
  selector: 'app-venue-details-create',
  templateUrl: './venue-details-create.component.html',
  styleUrls: ['./venue-details-create.component.scss']
})
export class VenueDetailsCreateComponent implements OnInit {
  loading: boolean;
  error: string;
  venueDetailsData: VenueDetails[];
  message = '';
  public createForm: FormGroup;
  submitted = false;
  venueType: VenueDetails[] = [];
  displaySequence: VenueDetailsItem[] = [
    {value: 1, viewValue: '1'},
    {value: 2, viewValue: '2'},
    {value: 3, viewValue: '3'},
    {value: 4, viewValue: '4'},
    {value: 5, viewValue: '5'},
    {value: 6, viewValue: '6'},
    {value: 7, viewValue: '7'},
    {value: 8, viewValue: '8'},
    {value: 9, viewValue: '9'},
    {value: 10, viewValue: '10'},
    {value: 11, viewValue: '11'},
    {value: 12, viewValue: '12'},
    {value: 13, viewValue: '13'},
    {value: 14, viewValue: '14'},
    {value: 15, viewValue: '15'},
    {value: 16, viewValue: '16'},
    {value: 17, viewValue: '17'},
    {value: 18, viewValue: '18'},
    {value: 19, viewValue: '19'},
    {value: 20, viewValue: '20'}
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
    this.createForm = fb.group({
      'prdctId': [null, Validators.required],
      'prdctDetId': ['0', Validators.required],
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
    this.getVenueType();
  }

  // Venue Type from server
  getVenueType() {
    this.venueDetailsService.getVenueType()
      .subscribe(type => {
        this.venueType = type;
      });
  }


  ///// Save Method //////
  /** POST: add a new venue details to the database **/
  createVenueDetails() {
    this.submitted = true;
    // // stop here if form is invalid
    if (this.createForm.invalid) {
      return;
    }
    this.loading = true;
    this.venueDetailsService
      .addVenueDetails(this.createForm.value)
      .subscribe((value) => {
        this.notificationService.onSuccess('Successfully Added.');
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
    return this.createForm.controls;
  }
  // end google captcha
  goBack() {
    this.router.navigate(['/admin/venue-details/show']);
  }
}
