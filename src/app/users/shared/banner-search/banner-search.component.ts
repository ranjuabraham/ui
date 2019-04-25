import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Banner} from '../../pages/banner/banner';
import {Observable} from 'rxjs';

/* Date picker packages */
import {NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS, MatSelectChange} from '@angular/material';
import {AppDateAdapter, APP_DATE_FORMATS} from './date.adapter';
/* end Date picker packages */

import {IMyDpOptions} from '../../../../packages/my-date-picker/interfaces';

import {BannerService} from '../../pages/banner/banner.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AppService} from '../../../app.service';
import {DataService} from '../../pages/halls-list/data.service';

export interface Venue {
  searchAct: number;
  searchDesc: string;
  searchDetAct: number;
  searchDetDesc: string;
  searchDetId: number;
  searchDetMap: number;
  searchDetSeq: number;
  searchId: number;
  searchSeq: number;
  venueTypeId: number;
}

@Component({
  selector: 'app-banner-search',
  templateUrl: './banner-search.component.html',
  styleUrls: ['./banner-search.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class BannerSearchComponent implements OnInit {
  public searchForm: FormGroup;
  venueType: Banner[] = [];
  venueCtrl = new FormControl();
  filteredVenues: Observable<Banner[]>;
  searchDatePicker: IMyDpOptions;
  public muhurthamDates: any;
  public curentDate = new Date();
  public productName: any;
  public categoryName: any;
  public prdctDetId: any;
  public subHallId: any;
  modifySearchForm: FormGroup;
  placeholder = 'Event Date';
  submitted = false;
  venueName: any;
  listData;
  totalRecords;
  dataType;
  categoryId;
  areaId;
  typeUrl;
  venue;
  date;
  data;
  temp;
  currentUrl;
  monthLabel = {
    1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June',
    7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December'
  };

  categoryList = [
    {categoryId: 4, name: 'Marriage Halls'},
    {categoryId: 3, name: 'Mini Halls'},
    {categoryId: 7, name: 'Banquet Halls'},
    {categoryId: 2, name: 'Party Halls'},
  ];
  constructor(private fb: FormBuilder,
              private  bannerService: BannerService,
              public router: Router,
              private route: ActivatedRoute,
              private http: HttpClient,
              private appService: AppService,
              public _dataService: DataService) {
    this.router.events.subscribe((res) => {
      if (this.router.url === '/search/marriage-halls') {
        this.categoryId = 4;
      }
      if (this.router.url === '/search/mini-halls') {
        this.categoryId = 3;
      }
      if (this.router.url === '/search/banquet-halls') {
        this.categoryId = 7;
      }
      if (this.router.url === '/search/party-halls') {
        this.categoryId = 2;
      }
      if (this.router.url === '/') {
        this.categoryId = 4;
      }
    });

    this.modifySearchForm = fb.group({
      venue: [null, Validators.required],
      date: [null],
      // venueTypeId: [this.categoryId],
      count: [10],
      page: [1],
      categoryId: [null],
      hideRequired: false,
      floatLabel: 'auto',
    });
  }

  ngOnInit() {
    this.getVenueType();
    if (this.router.url === '/') {
      this.currentUrl = this.router.url;
    }
  }

  goto(name: string) {
    this.router.events.subscribe((res) => {
      this.typeUrl = res;
      // let control: AbstractControl = null;
      this.modifySearchForm.reset();
      this.modifySearchForm.markAsUntouched();
      // Object.keys(this.modifySearchForm.controls).forEach((venue) => {
      //   control = this.modifySearchForm.controls[venue];
      //   control.setErrors(null);
      // });
      this.submitted = false;
      if (this.typeUrl.url === '/search/marriage-halls') {
        this.categoryId = 4;
      }
      if (this.typeUrl.url === '/search/mini-halls') {
        this.categoryId = 3;
        this.currentUrl = false;
      }
      if (this.typeUrl.url === '/search/banquet-halls') {
        this.categoryId = 7;
        this.currentUrl = false;
      }
      if (this.typeUrl.url === '/search/party-halls') {
        this.categoryId = 2;
        this.currentUrl = false;
      }
      if (this.typeUrl.url === '/') {
        this.currentUrl = true;
      }
      // return this.venueTypeId;
    });
    this.getVenueType();
  }

  // GET: get city and venue name in onChange category list
  changeCategory(event: MatSelectChange) {
    this.categoryId = event;
    // alert(this.categoryId);
    this.getVenueType();
  }

// convenience getter for easy access to form fields
  get f() {
    return this.modifySearchForm.controls;
  }
  // Venue Type from server
  getVenueType() {
    this.appService.getVenueType(this.categoryId)
      .subscribe(type => {
        this.venueType = type;
        this.muhurthamDates = this.venueType['date'];
        this.venueType = this.venueType['list'];
        this.searchDatePicker = {
          // other options...
          selectorWidth: '320px',
          selectorHeight: '315px',
          showTodayBtn: false,
          monthLabels: this.monthLabel,
          dateFormat: 'dd-mm-yyyy',
          firstDayOfWeek: 'mo',
          sunHighlight: true,
          inline: false,
          markDates: this.muhurthamDates,
          showInputField: true,
          markCurrentDay: true,
          indicateInvalidDate: true,
          monthSelector: false,
          yearSelector: false,
          editableDateField: false,
          auspiciousDayOnly: true,
          height: '34px',
          disableUntil: {year: this.curentDate.getFullYear(), month: this.curentDate.getMonth() + 1, day: this.curentDate.getDate() - 1},
          disableSince: {year: this.curentDate.getFullYear(), month: this.curentDate.getMonth() + 1, day: this.curentDate.getDate() + 180}
        };
      });
  }

  /** POST: Banner search halls list  from server **/
  onSubmit() {
    this.submitted = true;
    // // stop here if form is invalid
    if (this.modifySearchForm.invalid) {
      return;
    }
    const venue = this.modifySearchForm.value['venue'];
    const dt = this.modifySearchForm.value['date'].date;
    const eventDate = dt.day + '-' + dt.month + '-' + dt.year;
    const areaId = venue.searchDetId;
    this.productName = venue.searchDetDesc;
    this.date = this.modifySearchForm.value['date'];
    if (this.categoryId === 4) {
      this.categoryName = 'marriage-halls';
    } else if (this.categoryId === 3) {
      this.categoryName = 'mini-halls';
    } else if (this.categoryId === 7) {
      this.categoryName = 'banquet-halls';
    } else if (this.categoryId === 2) {
      this.categoryName = 'party-halls';
    } else {
    }
    this.prdctDetId = this.modifySearchForm.value['venue'].searchDetId;
    if (venue.searchId === 2) {
      this.router.navigate(['/chennai', this.categoryName],
        {queryParams: {categoryId: this.categoryId,  areaId: areaId, date: eventDate}});
    }
    if (venue.searchId === 1) {
      this.subHallId = 0;
      // this.getHallsDetails();
      this.router.navigate(['/chennai', this.categoryName , this.appService.findAndReplace(this.productName, ' ', '-').toLowerCase()],
        {queryParams: {categoryId: this.categoryId, venueId: this.prdctDetId, hallId: this.subHallId, date: eventDate}});
    }
  }
}
