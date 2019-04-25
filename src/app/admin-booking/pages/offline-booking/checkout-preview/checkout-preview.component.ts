import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {MatDialog} from '@angular/material';
import {MapViewDialogComponent} from "../map-view-dialog/map-view-dialog.component";

import {ReviewsDialogComponent} from '../reviews-dialog/reviews-dialog.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IMyDpOptions} from '../../../../../packages/my-date-picker/interfaces';
import {BookDialogComponent} from '../book-dialog/book-dialog.component';
import {ReserveDialogComponent} from '../reserve-dialog/reserve-dialog.component';
import {PolicyDialogComponent} from '../policy-dialog/policy-dialog.component';
import {ChargeableAmenitiesDialogComponent} from '../chargeable-amenities-dialog/chargeable-amenities-dialog.component';
import {AppService} from '../../../../app.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-checkout-preview',
  templateUrl: './checkout-preview.component.html',
  styleUrls: ['./checkout-preview.component.scss']
})
export class CheckoutPreviewComponent implements OnInit {
  public editProfileForm: FormGroup;
  submitted = false;
  public iconUrl = '../../../../../assets/images/icons/violet/';
  public productDetailsForm: FormGroup;
  public prdctDetId: number;
  venueEdit = true;
  previewDetails = true;
  public checked = true; // i agree checkbox
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  };

  public venueDetails;
  public formData;
  public tariffData;
  public buffetData;
  public userData;
  public termsAndConditionsData;
  public chargeableAmenitiesData;
  public bookData;
  public reserveData;
  public contactUsMap;
  public productImage;
  public blockType;
  public review;
  public rating;
  public loadData;
  public itemData;
  public responseData;
  public collectData;

  productDetId = this.route.snapshot.queryParamMap.get('productDetId');
  userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  bookingId = this.route.snapshot.queryParamMap.get('bookingId');

  constructor(public dialog: MatDialog,
              public  appService: AppService,
              public fb: FormBuilder,
              public router: Router,
              private route: ActivatedRoute,
              private http: HttpClient,
              private location: Location) {

    this.editProfileForm = this.fb.group({
      userName: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(200)])],
      userMobile: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(200)])],
      userEmail: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(200)])],
      address: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(200)])],
      agree: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.getDetailsPreview();
  }

  goBack() {
    this.location.back();
  }


  getDetailsPreview() {
    this.appService.getDetailsPreview(this.productDetId, this.userId, this.bookingId).subscribe(
      res => {
        this.responseData = res;
        this.chargeableAmenitiesData = res['content']['aminities'];
        this.termsAndConditionsData = res['content']['terms'];
        this.contactUsMap = res['content']['contact']['cntctUsGmap'];
        console.log(this.chargeableAmenitiesData);
        this.venueDetails = res['content']['contact'];
        this.productImage = res['content']['image'][0];
        this.review = res['content']['review'];
        this.rating = res['content']['rating'];
        this.formData = JSON.parse(res['result']['formData']);
        if (res['result']['buffetData']) {
          this.buffetData = JSON.parse(res['result']['buffetData']);
        }
        this.tariffData = JSON.parse(res['result']['tariffData']);
        this.blockType = JSON.parse(res['result']['blkType']);
        this.userData = JSON.parse(res['result']['userData']);
        if (res['result']['itemData']) {
          this.itemData = JSON.parse(res['result']['itemData']);
        } else {
          this.itemData = '';
        }
        this.loadData = res['result'];
        console.log(this.buffetData);
        console.log('food menu item -------------------------------------------');
      }
    );
  }

  collectionData() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')); // get user details in local storage
    const address = this.editProfileForm.value['address'];
    const subHallId = this.formData.subHallId;
    const eventName = this.formData.eventTypeName;
    const eventStartDate = this.formData.eventStartDate;
    const eventEndDate = this.formData.eventEndDate;
    return this.collectData = {
      prdctDetId: this.productDetId,
      subHallId: subHallId,
      eventName: eventName,
      userId: userInfo.usrId,
      bookingId: this.bookingId,
      bookingLevel: 3,
      eventStartDate: eventStartDate,
      eventEndDate: eventEndDate,
      formData: this.formData,
      tariffData: this.tariffData,
      itemData: this.itemData,
      liveCounter: 'No',
      leafService: 'No',
      status: 'Requested',
      paidStatus: 'No',
      blockType: this.blockType, // book or reserve
      customerData: {
        userId: userInfo.usrId,
        name: userInfo.usrFrstName,
        email: userInfo.emailId,
        mobile: userInfo.usrMobile,
        gender: userInfo.usrGndr,
        countryCode: userInfo.usrCntryCde,
        address: address,
        userTypeId: JSON.parse(localStorage.getItem('userInfo')).usrTypeId,
        userType: 'user'
      }
    };
  }

  continueBook() {
    this.submitted = true;
    // // stop here if form is invalid
    if (this.editProfileForm.invalid) {
      return;
    }
    if (this.buffetData) {
      this.buffetData = this.buffetData;
    } else {
      this.buffetData = '';
    }
    const data = Object.assign(this.collectionData(), {
      buffetData: this.buffetData,
    });
    this.bookData = data;
    this.bookDialog();
  }

  continueReserve() {
    this.submitted = true;
    // // stop here if form is invalid
    if (this.editProfileForm.invalid) {
      return;
    }
    if (this.buffetData) {
      this.buffetData = this.buffetData;
    } else {
      this.buffetData = '';
    }
    const data = Object.assign(this.collectionData(), {
      buffetData: this.buffetData,
    });
    this.reserveData = data;
    this.reserveDialog();
  }


  customerProfileForm() {
    this.submitted = true;
    // // stop here if form is invalid
    if (this.editProfileForm.invalid) {
      return;
    }
    console.warn(this.editProfileForm.value);
  }

  venueEditContinue() {
    this.venueEdit = false;
    this.previewDetails = true;
  }


  mapViewDialog(googleMap: string): void {
    const mapViewDialog = this.dialog.open(MapViewDialogComponent, {
      width: '50%',
      data: {googleMap: this.contactUsMap}
    });
  }

  openReviewDialog(prdctDetId: number): void {
    this.prdctDetId = prdctDetId;
    const dialogRef = this.dialog.open(ReviewsDialogComponent, {
      width: '60%',
      panelClass: 'review-dialog-box',
      data: {prdctDetId: this.venueDetails.productId}
    });
  }

  // /* venue gallery dialog view */
  // venueGalleryDialog(): void {
  //   const dialogRef = this.dialog.open(ProductGalleryDialogComponent, {
  //     width: '60%',
  //     data: {productId: this.responseData['result']['prdctDetId']},
  //     panelClass: 'gallery-dialog-container'
  //   });
  // }

  /* venue policies dialog view */
  policyDialog(): void {
    const dialogRef = this.dialog.open(PolicyDialogComponent, {
      width: '80%',
      data: {content: this.termsAndConditionsData},
      panelClass: 'policy-dialog-container'
    });
  }

  /* venue chargeable amenities dialog view */
  chargeableAmenitiesDialog(): void {
    const dialogRef = this.dialog.open(ChargeableAmenitiesDialogComponent, {
      width: '50%',
      data: {content: this.chargeableAmenitiesData},
      panelClass: 'chargeable-amenities-dialog-container'
    });
  }

  /* product book dialog box */
  bookDialog(): void {
    const dialogRef = this.dialog.open(BookDialogComponent, {
      width: '50%',
      data: this.bookData
    });
  }

  /* Product Reserve dialog box */
  reserveDialog(): void {
    const dialogRef = this.dialog.open(ReserveDialogComponent, {
      width: '50%',
      data: this.reserveData
    });
  }
  keyPress(event: any) {  // number validation
    const pattern = /[0-9\+\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
