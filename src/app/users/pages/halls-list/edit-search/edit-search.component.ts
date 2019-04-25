import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSelectChange} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AppService} from "../../../../app.service";
import {HttpClient} from "@angular/common/http";
import {BannerService} from "../../banner/banner.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Banner} from "../../banner/banner";
import {IMyDpOptions} from "../../../../../packages/my-date-picker/interfaces";
@Component({
  selector: 'app-edit-search',
  templateUrl: './edit-search.component.html',
  styleUrls: ['./edit-search.component.scss']
})
export class EditSearchComponent{
  modifySearchForm: FormGroup;
  submitted = false;
  venueType: Banner[] = [];
  searchDatePicker: IMyDpOptions;
  public venueName: any;
  public areaId: any;
  public date: any;
  public mdate: any;
  public categoryId: any;
  public selectedCategory: any;
  public selectedArea: any;
  public categoryUrl: any;
  public productName: any;
  public prdctDetId: any;
  getSelectedVal; // on modifySearch (get select box value)
  categoryList = [
    {categoryId: 4, name: 'Marriage Halls'},
    {categoryId: 3, name: 'Mini Halls'},
    {categoryId: 7, name: 'Banquet Halls'},
    {categoryId: 2, name: 'Party Halls'},
  ];
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  };

  // Initialized to specific date (09.10.2018).
  public model: any = { date: { year: 2018, month: 10, day: 9 } };

  monthLabel = {
    1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June',
    7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December'
  };
  constructor(public dialogRef: MatDialogRef<EditSearchComponent>,
              @Inject(MAT_DIALOG_DATA) public data, public sanitizer: DomSanitizer, public fb: FormBuilder, private activatedRoute: ActivatedRoute, public appService: AppService,
              public dialog: MatDialog,
              public router: Router,
              private http: HttpClient,
              public snackBar: MatSnackBar,
              private  bannerService: BannerService,
              private route: ActivatedRoute,
              private spinner: NgxSpinnerService) {
    this.selectedCategory = this.data.categoryId;
    if (this.route.snapshot.queryParamMap.get('areaId')) {
      this.areaId = this.route.snapshot.queryParamMap.get('areaId');
    } else {
      this.areaId = 0;
    }
    this.selectedArea = +this.areaId;
    this.modifySearchForm = this.fb.group({
      venue: [null, Validators.required],
      venueTypeId: [''],
      page: [1],
      count: [10],
      date: [''],
      categoryId: [null]
    });
  }


    onNoClick(): void {
    this.dialogRef.close();
  }

// convenience getter for easy access to form fields
  get f() {
    return this.modifySearchForm.controls;
  }

  get venueClr(): any {
    return this.modifySearchForm.get('venue');
  }
  // GET: get city and venue name in onChange category list
  changeCategory(event: MatSelectChange) {
    this.categoryId = +event;
    this.venueClr.reset();
    this.getVenueType();
    console.log(event);
    console.log(this.categoryId);
    console.log('chenage categoryp[pp]----------');
  }

  // GET: get venues data for disable search icon in drop down select box
  changeVenue(event: MatSelectChange) {
    this.selectedArea = event;
    console.log(event);
  }

  // Venue Type from server
  getVenueType() {
    this.appService.getVenueType(this.categoryId)
      .subscribe(type => {
        this.venueType = type;
        const muhurthamDates = this.venueType['date'];
        this.venueType = this.venueType['list'];
        for (let i = 0; i < this.venueType.length; i++) {
          const getSearchId = this.venueType[i].searchDetId;
          if (getSearchId === +this.areaId) {
            this.venueName = this.venueType[i];
            this.venueName = this.venueName.searchDetDesc;
          }
        }
        const currentDate = new Date();
        this.searchDatePicker = {
          // other options...
          selectorWidth: '125%',
          selectorHeight: '330px',
          showTodayBtn: false,
          monthLabels: this.monthLabel,
          dateFormat: 'dd-mm-yyyy',
          firstDayOfWeek: 'mo',
          sunHighlight: true,
          inline: false,
          markDates: muhurthamDates,
          showInputField: true,
          markCurrentDay: true,
          indicateInvalidDate: true,
          monthSelector: false,
          yearSelector: false,
          editableDateField: false,
          auspiciousDayOnly: true,
          height: '34px',
          disableUntil: {
            year: currentDate.getFullYear(),
            month: currentDate.getMonth() + 1,
            day: currentDate.getDate() - 1
          },
          disableSince: {
            year: currentDate.getFullYear(),
            month: currentDate.getMonth() + 1,
            day: currentDate.getDate() + 180
          }
        };

        if (this.route.snapshot.queryParamMap.get('date')) {
          const dt = this.route.snapshot.queryParamMap.get('date');
          const stDate = dt.split('-');
          this.date = {date: {day: +stDate[0], month: +stDate[1], year: +stDate[2]}};
          const weekday = new Array(7);
          weekday[0] = 'Sunday';
          weekday[1] = 'Monday';
          weekday[2] = 'Tuesday';
          weekday[3] = 'Wednesday';
          weekday[4] = 'Thursday';
          weekday[5] = 'Friday';
          weekday[6] = 'Saturday';

          const mDate = dt.split('-');
          const day = mDate[0];
          const month = +mDate[1];
          const year = mDate[2];
          const getDate = month + '.' + day + '.' + year;
          const st = new Date(getDate);
          this.mdate = ('0' + st.getDate()).slice(-2) + '-' + ('0' + (+st.getMonth() + 1)).slice(-2) + '-' + st.getFullYear() + ' ' + weekday[st.getDay()];
        } else {
          this.date = 0;
        }
      });
  }

  /** POST: modify search halls list  from server **/
  onModifySearch() {
    this.submitted = true;
    // // stop here if form is invalid
    if (this.modifySearchForm.invalid) {
      return;
    }
    const venue = this.modifySearchForm.value['venue'];
    const dt = this.modifySearchForm.value['date'].date;
    const eventDate = dt.day + '-' + dt.month + '-' + dt.year;
    for (let i = 0; i < this.venueType.length; i++) {
      const getSearchId = this.venueType[i].searchDetId;
      if (getSearchId === venue) {
        this.getSelectedVal = this.venueType[i];
      }
    }
    const areaId = this.getSelectedVal.searchDetId;
    this.productName = this.getSelectedVal.searchDetDesc;
    this.date = this.modifySearchForm.value['date'];
    if (this.categoryId === 4) {
      this.categoryUrl = 'marriage-halls';
    } else if (this.categoryId === 3) {
      this.categoryUrl = 'mini-halls';
    } else if (this.categoryId === 7) {
      this.categoryUrl = 'banquet-halls';
    } else if (this.categoryId === 2) {
      this.categoryUrl = 'party-halls';
    } else {
    }
    this.prdctDetId = this.getSelectedVal.searchDetId;
    if (this.getSelectedVal.searchId === 2) {
      this.areaId = areaId;
      // this.router.navigate(['/chennai', this.categoryUrl],
      //       //   {queryParams: {categoryId: this.categoryId, areaId: areaId, date: eventDate}});
      //       // console.log('list page');
      this.router.navigate(['/chennai', 'banquet-halls'], {queryParams: {categoryId: this.categoryId, areaId: areaId, date: eventDate}});
      this.dialogRef.close();
    }
    if (this.getSelectedVal.searchId === 1) {
      this.router.navigate(['/chennai', this.categoryUrl, this.appService.findAndReplace(this.productName, ' ', '-').toLowerCase()],
        {
          queryParams: {
            categoryId: this.categoryId,
            venueId: this.prdctDetId,
            hallId: 0,
            date: eventDate
          }
        });
      console.log('details page');
      this.dialogRef.close();
    }
  }
}
