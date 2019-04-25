import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {SlideshowModule} from 'ng-simple-slideshow';
import { NgxGalleryModule } from 'ngx-gallery';
import {MyDatePickerModule} from '../../../../packages/my-date-picker';


import { MarriageHallsComponent } from './marriage-halls/marriage-halls.component';
import { MiniHallsComponent } from './mini-halls/mini-halls.component';
import { BanquetHallsComponent } from './banquet-halls/banquet-halls.component';
import { PartyHallsComponent } from './party-halls/party-halls.component';
import { ModifySearchComponent } from './components/modify-search/modify-search.component';
import {SharedModule} from '../../shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {TimeAgoPipe} from 'time-ago-pipe';
import { ReviewsDialogComponent } from './reviews-dialog/reviews-dialog.component';
import { WriteReviewDialogComponent } from './write-review-dialog/write-review-dialog.component';
import { GalleryDialogComponent } from './gallery-dialog/gallery-dialog.component';
import { CustomSnackBarComponent } from './custom-snack-bar/custom-snack-bar.component';
import { CustomSnackBar1Component } from './custom-snack-bar1/custom-snack-bar1.component';
import { MapViewDialogComponent } from './map-view-dialog/map-view-dialog.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import {BookDialogComponent} from '../checkout/book-dialog/book-dialog.component';
import {ReserveDialogComponent} from '../checkout/reserve-dialog/reserve-dialog.component';
import { BookReserveComponent } from './venue-admin/book-reserve/book-reserve.component';
import {EditSearchComponent} from "./edit-search/edit-search.component";
import { CheckAvailabilityDialogComponent } from './check-availability-dialog/check-availability-dialog.component';
import {AmenitiesDialogComponent} from "./amenities-dialog/amenities-dialog.component";
import{BottomSheetAmeneties} from './details-page/details-page.component';
export const routes = [
  {path: 'marriage-halls', component: MarriageHallsComponent, data: { breadcrumb: 'Marriage Halls' }},
  {path: 'mini-halls', component: MiniHallsComponent, data: { breadcrumb: 'Mini Halls' }},
  {path: 'banquet-halls', component: BanquetHallsComponent, data: { breadcrumb: 'Banquet Halls' }},
  {path: 'party-halls', component: PartyHallsComponent, data: { breadcrumb: 'Party Halls' }},
  {path: 'venue-admin/book-reserve', component: BookReserveComponent},
  {path: ':category/:name', component: DetailsPageComponent},

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxPaginationModule,
    SharedModule,
    NgSelectModule,
    SlideshowModule,
    NgxGalleryModule,
    MyDatePickerModule,
  ],
  entryComponents: [
    ReviewsDialogComponent,
    WriteReviewDialogComponent,BottomSheetAmeneties,
    GalleryDialogComponent,
    CustomSnackBarComponent,
    CustomSnackBar1Component,
    MapViewDialogComponent,
    BookDialogComponent,
    ReserveDialogComponent,
    CheckAvailabilityDialogComponent,
    EditSearchComponent,
    AmenitiesDialogComponent
  ],
  declarations: [
    MarriageHallsComponent, MiniHallsComponent, BanquetHallsComponent,
    PartyHallsComponent, ModifySearchComponent, ReviewsDialogComponent, TimeAgoPipe,
    WriteReviewDialogComponent, GalleryDialogComponent,
    CustomSnackBarComponent, CustomSnackBar1Component,
    DetailsPageComponent,
    BookReserveComponent,BottomSheetAmeneties,
    EditSearchComponent,
    CheckAvailabilityDialogComponent, AmenitiesDialogComponent
  ]
})
export class HallsListModule { }
