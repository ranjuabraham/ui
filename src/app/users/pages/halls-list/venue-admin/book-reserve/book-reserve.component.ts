import {AfterViewInit, Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SwiperConfigInterface} from "ngx-swiper-wrapper";
import {NgxGalleryAnimation, NgxGalleryOptions} from "ngx-gallery";
import {IMyDpOptions} from "../../../../../../packages/my-date-picker/interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {AppService} from "../../../../../app.service";
import {MatDialog, MatSelectChange, MatSnackBar} from "@angular/material";
import {HttpClient} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import {LoginDialogComponent} from "../../../login-dialog/login-dialog.component";
import {MapViewDialogComponent} from "../../map-view-dialog/map-view-dialog.component";
import {ReviewsDialogComponent} from "../../reviews-dialog/reviews-dialog.component";

@Component({
  selector: 'app-book-reserve',
  templateUrl: './book-reserve.component.html',
  styleUrls: ['./book-reserve.component.scss']
})
export class BookReserveComponent implements OnInit, AfterViewInit {
  productDetailsForm: FormGroup;
  public loginData = JSON.parse(localStorage.getItem('userInfo'));
  public iconUrl = '../../../../assets/images/icons/hall-list/';
  public config: SwiperConfigInterface = {};
  galleryOptions: NgxGalleryOptions[];
  modifySearchForm: FormGroup;
  submitted = false;
  venueType; // get venue and area name from serve ( modify search )
  detailsData; // get date in banner search
  buffetTariffData; // store buffet tariff value
  collectData; // assign selected data
  $productId = this.route.snapshot.params['name'];
  prdctDetId;
  contact;
  halls;
  images;
  abouts;
  subHalls: any;
  subHallId;
  /* calendar */
  highLightsDate; // get highlights date for calender
  blockedDate; // get Blocked date for calender
  dateData; // get highlights date for calender
  day;
  month;
  year;
  startDate;
  endDate;
  addHours; // add hours (12)
  selectedSubHall;
  eventTypes;
  sessionData;
  foodTypes;
  public count = 0;
  public maxCount = 5;
  public maxClosingHours = 11;
  tariffDetails = false;
  tariffBuffetDetails = false;
  hourlyFlg;
  hours = false;
  hoursBtn;
  durationEndDay;
  durationEndTime;
  sessionId;
  getEventId;
  getFoodId;
  level;
  subHallDescription: string;
  public subHallName: string; // store SubHall name in on change
  public eventTypeName: string; // store Event type name in on change
  public sessionName: string; // store Session type name in on change
  public foodTypeName: string; // store Food type name in on change
  public additionalHours: any; // store additional hours
  public userProfileData = JSON.parse(localStorage.getItem('userInfo')); // get user details in local storage
  date;
  eventTypeId;
  foodId;
  placeholder = 'Event Start'; // placeholder
  eventDate = 'Event Date'; // placeholder
  selected;
  amenitiesData;
  public chargeableAmenitiesData; // store venue chargeable amenities value
  highlightsData;
  public termsAndConditionsData; // store venue terms and condition value
  tariffData: any;
  tariffType: any;
  gstAmount: number;
  discountValue: any;
  discountAmount: number;
  additionalHoursAmount: number;
  hourAmount: number;
  totalAmount: number;
  rentAmount: number;
  subTotalAmount: number;
  refundableAmount: number;
  refundDate: string;
  pricePerPlate: string;
  categoryId: any;
  reservePercentage: number;
  reservePeriod = false;
  reserveAmount: number;
  reservePeriodDays: number;
  gstValue: number;
  categoryName;
  productName;
  monthLabel = {
    1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June',
    7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December'
  };
  myDatePickerOptions: IMyDpOptions;
  searchDatePicker: IMyDpOptions;
  muhurthamDates;
  curentDate = new Date();
  productDetails;
  selectedCategoryList;
  categoryList = [
    {categoryId: 4, name: 'Marriage Halls'},
    {categoryId: 3, name: 'Mini Halls'},
    {categoryId: 7, name: 'Banquet Halls'},
    {categoryId: 2, name: 'Party Halls'},
  ];
  isSticky = false;
  isSticky1 = false;

  constructor(public fb: FormBuilder, private activatedRoute: ActivatedRoute, public appService: AppService,
              public dialog: MatDialog,
              public router: Router,
              private route: ActivatedRoute,
              private http: HttpClient,
              public snackBar: MatSnackBar,
              public sanitizer: DomSanitizer,
              private el: ElementRef) {
    this.modifySearchForm = this.fb.group({
      venue: [null, Validators.required],
      venueTypeId: [''],
      page: [1],
      count: [10],
      date: [''],
      categoryId: [null]
    });
    this.productDetailsForm = this.fb.group({
      subHallId: ['', Validators.required],
      startDate: [null],
      endDate: [null],
      eventTypeId: [null],
      sessionId: [null],
      foodId: [null],
    });
    this.categoryId = 7;
    this.prdctDetId = 74;
    this.subHallId = 0;
  }

  ngOnInit() {
    this.selectedCategoryList = +this.categoryId;
    this.galleryOptions = [
      {
        width: '100%',
        height: '400px',
        thumbnailsColumns: 4,
        thumbnailSize: '50px',
        thumbnailsRemainingCount: true,
        imageDescription: true,
        arrowPrevIcon: 'fa fa-chevron-left',
        arrowNextIcon: 'fa fa-chevron-right',
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 959,
        width: '100%',
        height: '400px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
    this.getVenueType(); // get venue and area name from serve ( modify search )
    this.getHallsDetails();

    console.log(this.loginData);
  }

  ngAfterViewInit() {
    this.config = {
      slidesPerView: 1,
      spaceBetween: 0,
      keyboard: true,
      navigation: true,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      }
    };
  }


  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 250;
    this.isSticky1 = window.pageYOffset >= 250;
  }

  // GET: get city and venue name in onChange category list
  changeCategory(event: MatSelectChange) {
    this.categoryId = event;
    this.getVenueType();
  }

  get isLoggedIn(): boolean {
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  // GET: get Halls details data(param: productId, subHallId)from server
  getHallsDetails() {
    this.appService.getHallsDetails(this.prdctDetId, this.subHallId, new Date().toDateString())
      .subscribe(type => {
        this.detailsData = type;
        console.log(this.detailsData);
        this.selectedSubHall = this.detailsData.body.content.subHallId;
        this.dateData = this.detailsData.body.date;
        this.detailsData = this.detailsData.body.content;
        this.contact = this.detailsData.contact;
        this.prdctDetId = this.detailsData.contact.prdctDetId;
        this.halls = this.detailsData.halls[0];
        this.subHalls = this.detailsData['halls'];
        this.amenitiesData = this.detailsData['fac'];
        this.chargeableAmenitiesData = this.detailsData['aminities'];
        this.highlightsData = this.detailsData['highlights'];
        this.termsAndConditionsData = this.detailsData['terms'];
        this.images = this.detailsData['image'];
        this.abouts = this.detailsData['about'];
        this.subHallDescription = this.detailsData['header'];
        this.refundableAmount = this.detailsData['misc'];
        this.refundDate = this.detailsData['dateline'];
        this.blockedDate = this.dateData.block.dates;
        this.highLightsDate = this.dateData.spec;
        this.myDatePickerOptions = {
          // other options...
          selectorWidth: '186%',
          selectorHeight: '315px',
          showTodayBtn: false,
          monthLabels: this.monthLabel,
          dateFormat: 'dd-mm-yyyy',
          firstDayOfWeek: 'mo',
          sunHighlight: true,
          inline: false,
          markDates: this.highLightsDate,
          disableDays: this.blockedDate,
          showInputField: true,
          markCurrentDay: true,
          indicateInvalidDate: true,
          monthSelector: false,
          yearSelector: false,
          editableDateField: false,
          material: true,
          height: '34px',
          disableUntil: {
            year: this.curentDate.getFullYear(),
            month: this.curentDate.getMonth() + 1,
            day: this.curentDate.getDate() + 3
          },
          disableSince: {
            year: this.curentDate.getFullYear(),
            month: this.curentDate.getMonth() + 1,
            day: this.curentDate.getDate() + 180
          }
        };
      });
  }


  get startDateClr(): any {
    return this.productDetailsForm.get('startDate');
  }

  get endDateClr(): any {
    return this.productDetailsForm.get('endDate');
  }

  get sessionIdClr(): any {
    return this.productDetailsForm.get('sessionId');
  }

  get eventIdClr(): any {
    return this.productDetailsForm.get('eventTypeId');
  }

  get foodIdClr(): any {
    return this.productDetailsForm.get('foodId');
  }

  get eventEndClr(): any {
    return this.productDetailsForm.get('endDate');
  }

  public increment(count) {
    if (this.count < this.maxCount) {
      this.count++;
      const obj = {
        addHours: this.count,
      };
    }
    this.getProductDetails();
  }

  public decrement(count) {
    if (this.count > 0) {
      this.count--;
      const obj = {
        addHours: this.count,
      };
    }
    this.getProductDetails();
  }

  getProductDetails() {
    this.appService.getProductDetails(this.prdctDetId, this.subHallId, this.date,
      this.eventTypeId, this.sessionId, this.foodId, this.level)
      .subscribe(type => {
        this.productDetails = type;
        this.blockedDate = this.productDetails['dates'].block;
        this.highLightsDate = this.productDetails['dates'].spec;
        this.eventTypes = this.productDetails.tariff.evtList;
        this.sessionData = this.productDetails.tariff['durList'];
        this.foodTypes = this.productDetails.tariff['fdTypList'];
        this.hourlyFlg = this.productDetails.tariff['hourlyFlg'];
        this.subHallDescription = this.productDetails.tariff['header'];
        this.refundableAmount = this.productDetails.tariff['misc'];
        this.refundDate = this.productDetails.tariff['dateline'];
        this.amenitiesData = this.productDetails.tariff['facList'];
        this.pricePerPlate = this.productDetails.tariff['buffet'];
        // tariff calculations
        this.tariffData = this.productDetails.tariff['valList'][0];
        if (this.tariffData) {
          this.rentAmount = this.tariffData['rentVal'];
          this.hourAmount = this.tariffData['hourlyTar'];
          console.log(this.hourAmount);
          this.additionalHoursAmount = this.tariffData['hourlyTar'] * this.count;
          const beforeDiscount = (this.tariffData['hourlyTar'] * this.count) + this.tariffData['rentVal'];
          this.discountAmount = beforeDiscount * this.tariffData['discVal'] / 100;
          const subTotal = beforeDiscount - this.discountAmount;
          this.subTotalAmount = subTotal;
          this.discountValue = this.tariffData['discVal'];
          this.gstValue = this.tariffData['servPrct'];
          this.gstAmount = subTotal * this.gstValue / 100;
          this.totalAmount = subTotal + this.gstAmount;
          this.reservePercentage = this.tariffData['reserveVal'];
          this.reserveAmount = this.totalAmount * this.reservePercentage / 100;
          if (this.reservePercentage === 0) {
            this.reservePeriodDays = this.tariffData['reservePeriod'] + 180;
          } else {
            this.reservePeriodDays = this.tariffData['reservePeriod'];
          }
          const reservePeriodDays = this.reservePeriodDays;
          const currentDate = new Date();
          currentDate.setDate(currentDate.getDate() + reservePeriodDays);
          const reservePeriod = currentDate;

          const date1 = new Date(this.month + '-' + (this.day) + '-' + this.year);
          const eventDate = new Date(date1.toDateString());
          if (reservePeriod < eventDate) {
            this.reservePeriod = true;
          } else {
            this.reservePeriod = false;
          }
        }

        this.myDatePickerOptions = {
          // other options...
          selectorWidth: '186%',
          selectorHeight: '315px',
          showTodayBtn: false,
          monthLabels: this.monthLabel,
          dateFormat: 'dd-mm-yyyy',
          firstDayOfWeek: 'mo',
          sunHighlight: true,
          inline: false,
          markDates: this.highLightsDate,
          disableDays: this.blockedDate,
          showInputField: true,
          markCurrentDay: true,
          indicateInvalidDate: true,
          monthSelector: false,
          yearSelector: false,
          editableDateField: false,
          height: '34px',
          disableUntil: {
            year: this.curentDate.getFullYear(),
            month: this.curentDate.getMonth() + 1,
            day: this.curentDate.getDate() + 3
          },
          disableSince: {
            year: this.curentDate.getFullYear(),
            month: this.curentDate.getMonth() + 1,
            day: this.curentDate.getDate() + 180
          }
        };
      });
  }

  onChangeSubHalls(event) {
    if (!this.isLoggedIn) {
      const dialogRef = this.dialog.open(LoginDialogComponent, {
        disableClose: true,
        data: {}
      });
    } else {
      this.startDateClr.reset();
      this.endDateClr.reset();
      this.sessionIdClr.reset();
      this.eventIdClr.reset();
      this.foodIdClr.reset();
      const target = event.source.selected._element.nativeElement;
      const selectedData = {
        value: event.value,
        text: target.innerText.trim()
      };
      this.subHallName = selectedData.text;
      this.selectedSubHall = event.value;
      this.subHallId = this.selectedSubHall;
      this.date = '0';
      this.eventTypeId = '0';
      this.sessionId = '0';
      this.foodId = '0';
      this.level = '1';
      this.count = 0;
      this.hours = false;
      this.tariffDetails = false;
      this.tariffBuffetDetails = false;
      this.getProductDetails();
    }
  }

  public getStartDate(date: any) {
    if (!this.isLoggedIn) {
      const dialogRef = this.dialog.open(LoginDialogComponent, {
        disableClose: true,
        data: {}
      });
    } else {
      this.sessionIdClr.reset();
      this.eventIdClr.reset();
      this.foodIdClr.reset();
      this.day = date.day;
      this.month = date.month;
      this.year = date.year;
      this.startDate = this.day + '/' + (this.month) + '/' + this.year;
      this.endDate = ('0' + this.day).slice(-2) + '-' + ('0' + (this.month)).slice(-2) + '-' + this.year;
      this.date = this.startDate;
      this.subHallId = this.selectedSubHall;
      this.eventTypeId = '0';
      this.sessionId = '0';
      this.foodId = '0';
      this.level = '2';
      this.count = 0;
      this.hours = false;
      this.tariffDetails = false;
      this.tariffBuffetDetails = false;
      this.getProductDetails();
    }
  }

  public getSessions(event: MatSelectChange) {
    this.sessionIdClr.reset();
    this.foodIdClr.reset();
    const getData = JSON.parse(event.value);
    this.eventTypeName = getData['evtHdr'];
    this.getEventId = getData['evtId'];
    this.tariffType = getData['evtShwFor']; // check for buffet and hourly type value (1 / 0)
    this.date = this.startDate;
    this.subHallId = this.selectedSubHall;
    this.eventTypeId = this.getEventId;
    this.sessionId = '0';
    this.foodId = '0';
    this.level = '3';
    this.count = 0;
    this.hours = false;
    this.tariffDetails = false;
    this.tariffBuffetDetails = false;
    this.getProductDetails();
  }

  public changeSession(event: MatSelectChange) {
    this.foodIdClr.reset();
    this.hoursBtn = JSON.parse(event.value);
    const getDuration = JSON.parse(event.value);
    this.sessionName = getDuration['durHdr'];
    this.durationEndDay = getDuration['durEDay'];
    this.durationEndTime = getDuration['durEtm'];
    // durMul (multiple days)
    // durSDay (AM/PM)
    if (getDuration['durMul'] === 1) {
      if (getDuration['durSDay'] === 2) {
        this.addHours = 12;
      } else {
        this.addHours = 0;
      }
      // durDtm (total hours)
      const totalDuration = (getDuration['durDtm'] + this.addHours) / 24;
      if (totalDuration >= 1) {
        const roundOffDay = Math.ceil(totalDuration) - 1;
        const tt = this.month + '/' + this.day + '/' + this.year;
        const date = new Date(tt);
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + roundOffDay);
        const dd = newDate.getDate();
        const mm = newDate.getMonth() + 1;
        const y = newDate.getFullYear();
        const eventEndDate = ('0' + dd).slice(-2) + '-' + ('0' + mm).slice(-2) + '-' + y;
        this.endDate = eventEndDate;
      }
    } else {
      const tt = this.day + '-' + this.month + '-' + this.year;
      this.endDate = tt;
    }
    if (this.hoursBtn.adnlDurFlg === 1) {
      this.hours = true;
      if (this.hoursBtn.durEDay === 2) {
        const getHours = this.maxClosingHours - this.durationEndTime;
        if (getHours < this.maxCount) {
          this.maxCount = getHours;
        }
      }
    }
    this.sessionId = this.hoursBtn['durId'];
    this.date = this.startDate;
    this.subHallId = this.selectedSubHall;
    this.eventTypeId = this.eventTypeId;
    this.sessionId = this.sessionId;
    this.foodId = '0';
    this.level = '4';
    this.count = 0;
    this.tariffDetails = false;
    this.tariffBuffetDetails = false;
    this.getProductDetails();
  }


  /* get Tariff from server (change event in foodType) */
  public getTariff(event: MatSelectChange) {
    if (this.tariffType === 0) {
      this.tariffDetails = true;
    }
    if (this.tariffType === 1) {
      this.tariffBuffetDetails = true;
    }
    const getFoodType = JSON.parse(event.value);
    this.foodTypeName = getFoodType['fdTypHdr'];
    this.getFoodId = getFoodType['fdTypId'];
    this.date = this.startDate;
    this.subHallId = this.selectedSubHall;
    this.eventTypeId = this.getEventId;
    this.sessionId = this.sessionId;
    this.foodId = this.getFoodId;
    this.level = '5';
    this.getProductDetails();
  }

  // Venue Type from server
  getVenueType() {
    this.appService.getVenueType(this.categoryId)
      .subscribe(res => {
        this.muhurthamDates = res.date;
        this.venueType = res.list;
        this.searchDatePicker = {
          // other options...
          selectorWidth: '160%',
          selectorHeight: '370px',
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
          disableUntil: {
            year: this.curentDate.getFullYear(),
            month: this.curentDate.getMonth() + 1,
            day: this.curentDate.getDate() - 1
          },
          disableSince: {
            year: this.curentDate.getFullYear(),
            month: this.curentDate.getMonth() + 1,
            day: this.curentDate.getDate() + 180
          }
        };
      });
  }

// convenience getter for easy access to form fields
  get f() {
    return this.modifySearchForm.controls;
  }

  /** POST: modify search halls list  from server **/
  onModifySearch() {
    this.submitted = true;
    // // stop here if form is invalid
    if (this.modifySearchForm.invalid) {
      return;
    }
    const venue = this.modifySearchForm.value['venue'];
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
        {queryParams: {categoryId: this.categoryId, areaId: areaId, date: 0}});
    }
    if (venue.searchId === 1) {
      this.subHallId = 0;
      this.getHallsDetails();
      this.router.navigate(['/chennai', this.categoryName, this.appService.findAndReplace(this.productName, ' ', '-').toLowerCase()],
        {queryParams: {categoryId: this.categoryId, venueId: this.prdctDetId, hallId: this.subHallId, date: 0}});
    }
  }

  /* Iframe map dialog box */
  mapViewDialog(googleMap: string): void {
    const mapViewDialog = this.dialog.open(MapViewDialogComponent, {
      width: '50%',
      data: {googleMap: googleMap}
    });
  }

  /* Iframe map dialog box */
  openReviewDialog(prdctDetId: number): void {
    this.$productId = prdctDetId;
    const dialogRef = this.dialog.open(ReviewsDialogComponent, {
      width: '60%',
      panelClass: 'review-dialog-box',
      data: {prdctDetId: this.$productId}
    });
  }

  public collectionData() {
    const productDetails = this.contact;
    const userInfo = this.userProfileData;
    const halls = this.halls;
    if (!this.subHallName) {
      this.subHallName = halls.dcdeHdr;
    }
    const arr = this.endDate.split('-');
    const date = arr[0];
    const month = arr[1];
    const year = arr[2];
    const eventEndDate = ('0' + date).slice(-2) + '|' + ('0' + (month)).slice(-2) + '|' + year;
    const eventStartDate = ('0' + this.day).slice(-2) + '|' + ('0' + (this.month)).slice(-2) + '|' + this.year;
    return this.collectData = {
      bookingLevel: 1,
      eventTypeName: this.eventTypeName,
      userId: userInfo.usrId,
      prdctDetId: productDetails.prdctDetId,
      subHallId: this.subHallId,
      eventTypeId: this.eventTypeId,
      sessionId: this.sessionId,
      foodTypeId: this.getFoodId,
      eventStartDate: eventStartDate,
      eventEndDate: eventEndDate,
      itemData: '',
      customerData: {
        userId: userInfo.usrId,
        name: userInfo.usrFrstName,
        email: userInfo.emailId,
        mobile: userInfo.usrMobile,
        gender: userInfo.usrGndr,
        countryCode: userInfo.usrCntryCde,
        address: '',
        userTypeId: userInfo.usrTypeId,
        userType: 'user'
      },
      formData: {
        venueName: this.contact['cntctUsName'],
        subHallName: this.subHallName,
        userId: userInfo.usrId,
        productId: productDetails.prdctDetId,
        subHallId: this.subHallId,
        valId: this.tariffData.valId,
        eventStartDate: eventStartDate,
        eventEndDate: eventEndDate,
        eventTypeName: this.eventTypeName,
        eventTypeId: this.eventTypeId,
        sessionName: this.sessionName,
        sessionId: this.sessionId,
        foodTypeName: this.foodTypeName,
        foodTypeId: this.getFoodId,
        additionalHours: this.count,
        depositDate: this.refundDate
      }
    };
  }

  continueToReserve() {
    const tariffData = {
      rentAmount: this.rentAmount,
      discountValue: this.discountValue,
      discountAmount: this.discountAmount,
      hourAmount: this.hourAmount,
      additionalHours: this.count,
      additionalHoursAmount: this.additionalHoursAmount,
      gstAmount: this.gstAmount,
      gstValue: this.gstValue,
      subTotal: this.subTotalAmount,
      totalAmount: this.totalAmount,
      reserveAmount: this.reserveAmount,
      refundableAmount: this.refundableAmount
    };
    const data = Object.assign(this.collectionData(), {
      blockType: 2, // book or reserve
      tariffData: tariffData,
      buffetData: '',
    });
    this.http.post('/ema/venue/update-block', data).subscribe(res => {
      if (res['status'] === 'SUCCESS') {
        const hallName = 'the-checkers';
        const userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
        const bookingId = res['transaction'];
        const productDetId = res['prdctDetId'];
        this.router.navigate(['checkout/preview'],
          {queryParams: {productDetId: productDetId, bookingId: bookingId}});
      } else {
        alert('Oops..., Something went wrong!');
      }
    });
  }

  continueToBook() {
    const tariffData = {
      rentAmount: this.rentAmount,
      discountValue: this.discountValue,
      discountAmount: this.discountAmount,
      hourAmount: this.hourAmount,
      additionalHours: this.count,
      additionalHoursAmount: this.additionalHoursAmount,
      gstAmount: this.gstAmount,
      gstValue: this.gstValue,
      subTotal: this.subTotalAmount,
      totalAmount: this.totalAmount,
      reserveAmount: 0,
      refundableAmount: this.refundableAmount
    };
    const data = Object.assign(this.collectionData(), {
      blockType: 1, // book or reserve
      tariffData: tariffData,
      buffetData: '',
    });
    this.http.post('/ema/venue/update-block', data).subscribe(res => {
      if (res['status'] === 'SUCCESS') {
        const hallName = 'the-checkers';
        const userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
        const bookingId = res['transaction'];
        const productDetId = res['prdctDetId'];
        this.router.navigate(['checkout/preview'],
          {queryParams: {productDetId: productDetId, bookingId: bookingId}});
      } else {
        alert('Oops..., Something went wrong!');
      }
    });
  }

  continueToFoodMenu() {
    const data = Object.assign(this.collectionData(), {
      blockType: 1, // book or reserve
      tariffData: [],
      buffetData: '',
      guaranteedPax: this.pricePerPlate[0]['buffMin']
    });
    this.http.post('/ema/venue/update-block', this.collectData).subscribe(res => {
      if (res['status'] === 'SUCCESS') {
        this.router.navigate(['checkout/food-menus'],
          {
            queryParams: {
              productDetId: res['prdctDetId'],
              subHallId: res['subPrdctDetId'],
              foodTypeId: res['foodTypeId'],
              bookingId: res['transaction']
            }
          });
      } else {
        alert('Oops..., Something went wrong!');
      }
    });
  }
}
