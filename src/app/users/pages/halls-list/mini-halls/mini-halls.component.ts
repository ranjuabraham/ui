import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  HostListener,
  EventEmitter,
  Output,
  Input,
  forwardRef
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatRadioButton, MatSelectChange, MatSnackBar, MatTabChangeEvent} from '@angular/material';
import {MatRadioChange} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {trigger} from '@angular/animations';
import {Observable} from 'rxjs';
import {delay, map, tap} from 'rxjs/operators';
/* Date picker packages */
import {NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS} from '@angular/material';
import {AppDateAdapter, APP_DATE_FORMATS} from '../date.adapter';
/* end Date picker packages */

import {Category, Filter, HallComponent} from '../../../../app.models';
import {AppService} from '../../../../app.service';
import {ReviewsDialogComponent} from '../reviews-dialog/reviews-dialog.component';
import {GalleryDialogComponent} from '../gallery-dialog/gallery-dialog.component';
import {Banner} from '../../banner/banner';
import {BannerService} from '../../banner/banner.service';
import {DataService} from '../data.service';
import {LoginDialogComponent} from '../../login-dialog/login-dialog.component';
import {CustomSnackBarComponent} from '../custom-snack-bar/custom-snack-bar.component';
import {CustomSnackBar1Component} from '../custom-snack-bar1/custom-snack-bar1.component';
import {MapViewDialogComponent} from '../map-view-dialog/map-view-dialog.component';
import {NgxSpinnerService} from 'ngx-spinner';
import {IMyDpOptions} from '../../../../../packages/my-date-picker/interfaces';
import {EditSearchComponent} from "../edit-search/edit-search.component";
import {CheckAvailabilityDialogComponent} from "../check-availability-dialog/check-availability-dialog.component";
import {AmenitiesDialogComponent} from "../amenities-dialog/amenities-dialog.component";
import {fadeIn, fadeOut} from "../../../@theme/utils/animations/fade-animations";
import {WriteReviewDialogComponent} from "../write-review-dialog/write-review-dialog.component";

const RESPONSE_DELAY = 1000;

export interface DialogData {
  prdctDetId: number;
  hallName: string;
}

export interface SubHalls {
  productId: number;
  subHallId: string;
}

export class Catege {
  public id: number;
  public hallName: string;
}


@Component({
  selector: 'app-mini-halls',
  templateUrl: './mini-halls.component.html',
  styleUrls: ['./mini-halls.component.scss'],
  animations: [
    trigger('fadeOut', fadeOut()),
    trigger('fadeIn', fadeIn(':enter'))
  ]
})

export class MiniHallsComponent implements OnInit {
  @Output() change: EventEmitter<MatRadioChange>;
  @Input() name: string;
  @Input() ariaLabel: string;
  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen: boolean = true;
  public iconUrl = '../../../../../assets/images/icons/hall-list/';
  userId: any;
  loading: boolean;
  placeholderLoader: boolean;
  contentLoader = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  categories: Catege[] = [
    {id: 4, hallName: 'Marriage Halls'},
    {id: 3, hallName: 'Mini Halls'},
    {id: 7, hallName: 'Banquet Halls'},
    {id: 2, hallName: 'Party Halls'},
  ];
  public loginData = JSON.parse(localStorage.getItem('userInfo'));
  searchDatePicker: IMyDpOptions;
  capacityName;
  priceRangeText;


  public categoryId: any;
  public capacityId: any;
  public priceRangeId: any;
  public areaId: any;

  public date: any;
  public mdate: any;
  public model: any;
  public prdctDetId: any;
  public subHallId: any;
  public selectedCategory: any;
  public checkedCategory = this.appService.miniHallId;
  public selectedArea: any;
  public eventDate: any;
  public checkedArea: any;
  public getSearchId: any;
  public sessionContent: any;
  public categoryName: any;
  public categoryUrl: any;
  public productName: any;
  public wishList: any;
  getSelectedVal; // on modifySearch (get select box value)

  public page: any;
  public pageSize: any;
  public content: any;

  listData;
  assignData;
  hallsData: Filter;
  totalRecords;

  prdctDetDesc;
  getSubHallId; any;
  data: any;
  subHallsData: any;
  list;
  modifySearchForm: FormGroup;
  venueType: Banner[] = [];
  submitted = false;
  venueName: any;
  selectPrice;
  selectCapacity;
  selectedCategoryList;
  /* remove filter tag */
  removePrice = true;
  removeCapacity = true;
  removeArea = true;
  clearAll = true;
  categoryList = [
    {categoryId: 4, name: 'Marriage Halls'},
    {categoryId: 3, name: 'Mini Halls'},
    {categoryId: 7, name: 'Banquet Halls'},
    {categoryId: 2, name: 'Party Halls'},
  ];
  monthLabel = {
    1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June',
    7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December'
  };

  constructor(public fb: FormBuilder, private activatedRoute: ActivatedRoute, public appService: AppService,
              public dialog: MatDialog,
              public router: Router,
              private http: HttpClient,
              public snackBar: MatSnackBar,
              private  bannerService: BannerService,
              private route: ActivatedRoute,
              private spinner: NgxSpinnerService) {
    const getAreaId = this.route.snapshot.queryParamMap.get('areaId');
    this.categoryId = this.appService.miniHallId;
    if (this.route.snapshot.queryParamMap.get('capacityId')) {
      this.capacityId = this.route.snapshot.queryParamMap.get('capacityId');
    } else {
      this.capacityId = 0;
    }
    if (this.route.snapshot.queryParamMap.get('priceId')) {
      this.priceRangeId = this.route.snapshot.queryParamMap.get('priceId');
    } else {
      this.priceRangeId = 0;
    }
    if (this.route.snapshot.queryParamMap.get('areaId')) {
      this.areaId = this.route.snapshot.queryParamMap.get('areaId');
    } else {
      this.areaId = 0;
    }

    // if (this.route.snapshot.queryParamMap.get('date')) {
    //   const dt = this.route.snapshot.queryParamMap.get('date');
    //   const stDate = dt.split('-');
    //   this.date = {date: {day: stDate[0], month: stDate[1], year: stDate[2] }};
    // } else {
    //   this.date = 0;
    // }
    console.log(this.route.snapshot.queryParamMap.get('date'));
    this.pageSize = 10;
    this.page = 1;
    this.content = 'sort';

    this.categoryName = 'Mini Halls';
    this.checkedArea = +this.areaId;
    this.selectedCategory = this.appService.miniHallId;
    if (this.loginData) {
      this.userId = this.loginData.usrId;
    }

    this.modifySearchForm = this.fb.group({
      venue: [null, Validators.required],
      venueTypeId: [''],
      page: [1],
      count: [10],
      date: [''],
      categoryId: [null]
    });
  }

  ngOnInit() {
    this.selectedCategory = this.appService.miniHallId;  // categoryId = 3;
    if (window.innerWidth < 960) {
      this.sidenavOpen = false;
    }
    this.getHallsList(); // halls list data
    this.getVenueType();
    this.getUserWishList();
    this.getHallFilter(); // Halls side filter data ( side filter in list page)
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }

  get venueClr(): any {
    return this.modifySearchForm.get('venue');
  }

  get eventDateClr(): any {
    return this.modifySearchForm.get('date');
  }


  // GET: get city and venue name in onChange category list
  changeCategory(event: MatSelectChange) {
    this.categoryId = +event;
    this.venueClr.reset();
    this.getVenueType();
  }

  /* remove Price filter tag */
  removePriceFilter(): void {
    this.priceRangeId = 0;
    this.page = 1;
    this.priceRangeText = false;
    this.selectPrice = false;
    console.log(this.selectPrice);
    this.getHallsList();
    this.getHallFilter();
    this.router.navigate(['/chennai/mini-halls'],
      {
        queryParams: {
          prdctId: this.appService.miniHallId, capacityId: this.categoryId,
          priceId: '0', areaId: this.areaId
        }
      });
  }

  /* remove Capacity filter tag */
  removeCapacityFilter(): void {
    this.page = 1;
    this.capacityId = 0;
    this.capacityName = false;
    this.selectCapacity = false;
    this.getHallsList();
    this.getHallFilter();
    this.router.navigate(['/chennai/mini-halls'],
      {
        queryParams: {
          prdctId: this.appService.miniHallId, capacityId: this.capacityId,
          priceId: this.priceRangeId, areaId: this.areaId
        }
      });
  }


  /* remove area filters */
  removeAreaFilter(): void {
    this.areaId = 0;
    this.page = 1;
    this.venueName = false;
    this.selectedArea = false;
    this.getHallsList();
    this.getHallFilter();
    this.venueClr.reset();
    this.eventDateClr.reset();
    this.modifySearchForm.markAsPristine();
    this.modifySearchForm.markAsUntouched();
    this.modifySearchForm.updateValueAndValidity();
    this.router.navigate(['/chennai/mini-halls'],
      {
        queryParams: {
          prdctId: this.appService.miniHallId, capacityId: this.capacityId,
          priceId: this.priceRangeId, areaId: '0'
        }
      });
  }

  /* clear all filters */
  removeAllFilters(): void {
    this.areaId = 0;
    this.priceRangeId = 0;
    this.capacityId = 0;
    this.page = 1;
    this.venueName = false;
    this.selectedArea = false;
    this.checkedArea = false;
    this.priceRangeText = false;
    this.selectPrice = false;
    this.capacityName = false;
    this.selectCapacity = false;
    this.submitted = false;
    this.getHallsList();
    this.getHallFilter();
    this.venueClr.reset();
    this.eventDateClr.reset();
    this.modifySearchForm.markAsPristine();
    this.modifySearchForm.markAsUntouched();
    this.modifySearchForm.updateValueAndValidity();
    this.router.navigate(['/chennai/mini-halls']);
  }
  mapViewDialog(googleMap: string): void {
    const mapViewDialog = this.dialog.open(MapViewDialogComponent, {
      width: '50%',
      data: {googleMap: googleMap},
      panelClass: 'map-dialog-box',
    });
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
    if(dt){
      this.eventDate = dt.day + '-' + dt.month + '-' + dt.year;
    }
    this.getSelectedVal = venue;
    const areaId = this.getSelectedVal.searchDetId;
    this.productName = this.getSelectedVal.searchDetDesc;
    this.venueName = this.getSelectedVal.searchDetDesc;
    this.checkedArea = this.getSelectedVal.searchDetId;
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
      this.router.navigate(['/chennai', this.categoryUrl],
        {queryParams: {categoryId: this.categoryId, areaId: areaId, date: this.eventDate}});
      this.getHallsList();
      this.getHallFilter();

    }
    if (this.getSelectedVal.searchId === 1) {
      this.subHallId = 0;
      this.router.navigate(['/chennai', this.categoryUrl, this.appService.findAndReplace(this.productName, ' ', '-').toLowerCase()],
        {
          queryParams: {
            categoryId: this.categoryId,
            venueId: this.prdctDetId,
            hallId: this.subHallId,
            date: this.eventDate
          }
        });
    }
  }


  /* sub halls menu tab */
  subHallTabChanged(list: any, $event) {
    const prdctDetId = list.prdctDetId;
    const subHallId = list['hallInfos'][$event.index].dcdeId;
    this.hallSpecification(prdctDetId, subHallId)
  }
  /* sub halls menu ng select box for mobile */
  subHallChanged(list: any, $event) {
    const prdctDetId = list.prdctDetId;
    const getSubHallId = list['hallInfos'];
    for(let i = 0; i < getSubHallId.length; i++){
      if($event.toString() === getSubHallId[i].dcdeHdr){
        this.getSubHallId = getSubHallId[i].dcdeId;
      }
    }
    this.hallSpecification(prdctDetId, this.getSubHallId)
  }


  hallSpecification(prdctDetId: number, subHallId: number) {
    this.prdctDetId = prdctDetId;
    this.subHallId = subHallId;
    this.appService.getSubHallsSpecification(this.prdctDetId, this.subHallId)
      .subscribe(data => {
        this.subHallsData = data;
        this.list = this.subHallsData;
        for(let i = 0; i < this.listData.length; i++) {
          if(this.subHallsData.venueId === this.listData[i].prdctDetId){
            this.listData[i].subHallId = this.subHallsData.subHallId;
            this.listData[i].discVal = this.subHallsData.discount;
            this.listData[i].facInfos = this.subHallsData.facInfos;
            this.listData[i].tariff = this.subHallsData.tariff;
          }
        }
      });
  }


  getHallFilter() {
    this.appService.getHallFilter(this.appService.miniHallId, this.capacityId, this.priceRangeId, this.areaId)
      .subscribe(data => {
        this.hallsData = data;
        this.listData = this.hallsData;
        console.log(this.listData);
        if (this.capacityId) {
          for (let i = 0; i < this.listData.length; i++) {
            if (this.capacityId == this.listData[i].attrDetId) {
              this.capacityName = this.listData[i].ovrAttrDetSpec;
              this.selectCapacity = this.listData[i].attrDetId;
            }
          }
        }

        if (this.priceRangeId) {
          for (let i = 0; i < this.listData.length; i++) {
            if (this.priceRangeId == this.listData[i].attrDetId) {
              this.priceRangeText = this.listData[i].ovrAttrDetSpec;
              this.selectPrice = this.listData[i].attrDetId;
            }
          }
        }

        if (this.areaId) {
          for (let i = 0; i < this.listData.length; i++) {
            if (this.areaId == this.listData[i].attrDetId) {
              this.venueName = this.listData[i].ovrAttrDetSpec;
              this.selectedArea = { searchDetDesc: this.venueName, searchDetId: this.areaId, searchId: 2};
              this.checkedArea =  this.listData[i].attrDetId;
            }
          }
        }
      });
  }

  public getUserWishList() {
    if (this.loginData) {
      this.appService.getUserWishList(this.loginData.usrId)
        .subscribe((res) => {
          this.wishList = res;
        })
    }
  }

  public getHallsList() {
    this.spinner.show();
    this.placeholderLoader = true;
    // this.loading = false;
    this.appService.getHallsList(this.appService.miniHallId.toString(), '0', this.capacityId, this.priceRangeId,
      this.areaId, this.page, this.pageSize, this.content)
      .subscribe((response) => {
        this.listData = response;
        if (response.status) {
          this.spinner.hide();
        }
        this.totalRecords = this.listData.body.count;
        this.listData = this.listData.body['list']['venueInfos'];
        console.log(this.listData);
        console.log('krishnaaaaaaaaaaaaa');
        setTimeout(function () {
          this.placeholderLoader = false;
        }.bind(this), 100);
        const wishList = {wishList: 1};
        const noneWishList = {wishList: 0};
        this.assignData = [];
        if (this.listData) {
          for (let i = 0; i < this.listData.length; i++) {
            const assign1 = Object.assign(this.listData[i], noneWishList);
            if (this.wishList) {
              for (let j = 0; j < this.wishList.length; j++) {
                if (this.listData[i].prdctDetId === this.wishList[j]) {
                  const assign2 = Object.assign(this.listData[i], wishList);
                }
              }
            }
            this.assignData.push(assign1)
          }
        }

        this.listData = this.assignData;
      });
  }


  public getHallGallery(prdctDetId: number): void {
    this.prdctDetId = prdctDetId;
    const dialogRef = this.dialog.open(GalleryDialogComponent, {
      panelClass: 'gallery-dialog',
      data: {prdctDetId: this.prdctDetId}
    });
  }

  get isLoggedIn(): boolean {
    // expiration and user is signed in locally
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  addToWishList(userId: number, prdctDetId: number) {
    this.prdctDetId = prdctDetId;
    if (!this.isLoggedIn) {
      const dialogRef = this.dialog.open(LoginDialogComponent, {
        disableClose: true,
        data: {},
        panelClass: 'login-dialog-box'
      });
    } else {
      this.appService.addToWishList(this.userId, this.prdctDetId, 'add')
        .subscribe(data => {
          this.data = data;
          if (this.data === 'SUCCESS') {
            this.snackBar.openFromComponent(CustomSnackBarComponent, {
              panelClass: 'message-position', duration: 1500
            });
            const getElementId = document.getElementById('wishlist-' + prdctDetId).removeAttribute("src");
            document.getElementById('wishlist-' + prdctDetId).setAttribute('src', '../../../../assets/images/icons/hall-list/red-heart-icon.svg');
          } else if (this.data === 'ERROR') {
            this.snackBar.openFromComponent(CustomSnackBar1Component, {
              panelClass: 'message-position', duration: 1500
            });
          } else {
            this.snackBar.open('Oops! something went wrong. Please try again later', '×',
              {panelClass: 'error', verticalPosition: 'bottom', duration: 3000});
          }
        });
    }
  }

  openReviewDialog(prdctDetId: number): void {
    this.prdctDetId = prdctDetId;
    const dialogRef = this.dialog.open(ReviewsDialogComponent, {
      width: '60%',
      panelClass: 'review-dialog-box',
      data: {prdctDetId: this.prdctDetId}
    });
  }

  writeReviewDialog(prdctDetId: number, hallName: string): void {
    if (!this.isLoggedIn) {
      const dialogRef = this.dialog.open(LoginDialogComponent, {
        // width: '100%',
        disableClose: true,
        data: {},
        panelClass: 'login-dialog-box'
      });
    } else {
      const writeReview = this.dialog.open(WriteReviewDialogComponent, {
        width: '70%',
        panelClass: 'write-review-dialog-box',
        disableClose: true,
        data: {prdctDetId: prdctDetId, hallName: hallName}
      });
    }
  }

  public onPageChanged(event) {
    this.page = event;
    this.getHallsList();
    window.scrollTo(0, 0);
  }

  public onChangeCategory(event: MatRadioChange) {
    const mrButton: MatRadioButton = event.source;
    this.categoryName = mrButton.ariaLabel;
    this.categoryName = this.categoryName.replace(' ', '-').toLowerCase();
    this.router.navigate(['/chennai', this.categoryName]);
  }

  public onChangeCapacity(event: MatRadioChange) {
    const capacityButton: MatRadioButton = event.source;
    this.capacityName = capacityButton.ariaLabel;
    this.capacityId = event.value;
    this.page = 1;
    this.getHallsList();
    this.getHallFilter();
    this.router.navigate(['/chennai/mini-halls'],
      {
        queryParams: {
          prdctId: this.appService.miniHallId, capacityId: this.capacityId,
          priceId: this.priceRangeId, areaId: this.areaId
        }
      });
  }

  public onChangePriceRange(event: MatRadioChange) {
    const priceRangeBtn: MatRadioButton = event.source;
    this.priceRangeText = priceRangeBtn.ariaLabel;
    this.priceRangeId = event.value;
    this.page = 1;
    this.getHallsList();
    this.getHallFilter();
    this.router.navigate(['/chennai/mini-halls'],
      {
        queryParams: {
          prdctId: this.categoryId, capacityId: this.capacityId,
          priceId: this.priceRangeId, areaId: this.areaId
        }
      });
  }

  public onChangeArea(event: MatRadioChange) {
    const areaButton: MatRadioButton = event.source;
    this.venueName = areaButton.ariaLabel;
    this.areaId = event.value;
    this.selectedArea = event.value;
    this.page = 1;
    this.getHallsList();
    this.getHallFilter();
    this.router.navigate(['/chennai/mini-halls'],
      {
        queryParams: {
          prdctId: this.appService.miniHallId, capacityId: this.capacityId,
          priceId: this.priceRangeId, areaId: this.areaId
        }
      });
  }

  checkAvailability(prdctDetId: number, subHallId: number) {
    if (!this.isLoggedIn) {
      const dialogRef = this.dialog.open(LoginDialogComponent, {
        // width: '100%',
        disableClose: true,
        data: {},
        panelClass: 'login-dialog-box'
      });
    } else {
      const dialogRef = this.dialog.open(CheckAvailabilityDialogComponent, {
        width: '45%',
        data: {prdctDetId: prdctDetId, subHallId: subHallId},
        panelClass: 'check-availability-dialog'
      });
    }
  }

  bookReserve() {
    if (!this.isLoggedIn) {
      const dialogRef = this.dialog.open(LoginDialogComponent, {
        disableClose: true,
        data: {},
        panelClass: 'login-dialog-box'
      });
      return false;
    }
  }

  goBack(): void {
    this.loading = true;
    this.categoryId = 7;
    this.areaId = 0;
    this.page = 1;
    this.priceRangeId = 0;
    this.capacityId = 0;

    this.getHallsList();
    this.getHallFilter();
    this.venueName = false;
    this.selectedArea = false;
    this.priceRangeText = false;
    this.selectPrice = false;
    this.capacityName = false;
    this.selectCapacity = false;
    this.venueClr.reset();
    this.eventDateClr.reset();
    this.submitted = false;
    this.router.navigate(['/chennai/mini-halls']);
  }

  editsearch() {
    const editsearchDialog = this.dialog.open(EditSearchComponent, {
      width: '100%',
      panelClass: 'modify-search-dialog-box',
      data: {categoryId: this.appService.miniHallId}
    })
  }
  openAmenities(venueInfo: any) {
    const dialogRef = this.dialog.open(AmenitiesDialogComponent, {
      panelClass: 'amenities-dialog-box',
      data: venueInfo
    });
  }
}
