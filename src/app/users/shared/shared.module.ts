import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule, MatBottomSheetModule
} from '@angular/material';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
  suppressScrollX: true
};
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { LaddaModule } from 'angular2-ladda';
import { BannerSearchComponent } from './banner-search/banner-search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MarriageHallsComponent } from './popular-halls/marriage-halls/marriage-halls.component';
import { MiniHallsComponent } from './popular-halls/mini-halls/mini-halls.component';
import { BanquetHallsComponent } from './popular-halls/banquet-halls/banquet-halls.component';
import { PartyHallsComponent } from './popular-halls/party-halls/party-halls.component';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {MyDatePickerModule} from '../../../packages/my-date-picker';
import {WINDOW_PROVIDERS} from './window.service';
import {BookDialogComponent} from '../pages/checkout/book-dialog/book-dialog.component';
import {ReserveDialogComponent} from '../pages/checkout/reserve-dialog/reserve-dialog.component';
import {MapViewDialogComponent} from '../pages/halls-list/map-view-dialog/map-view-dialog.component';
import {BlockCopyPasteDirective} from "../@theme/directives/block-copy-paste.directive";
import {AutofocusDirective} from "../@theme/directives/auto-focus.directive";

import {NgxPrintModule} from 'ngx-print';
// import {CvaDateComponent} from './banner-search/cva-date.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBottomSheetModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    PerfectScrollbarModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    NgxSpinnerModule,
    MyDatePickerModule,
    NgxPageScrollModule,
    LaddaModule,
  ],
  exports: [
    RouterModule,
    SwiperModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBottomSheetModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    PerfectScrollbarModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    BannerSearchComponent,
    MarriageHallsComponent,
    MiniHallsComponent,
    BanquetHallsComponent,
    PartyHallsComponent,
    BreadcrumbComponent,
    MyDatePickerModule,
    NgxPageScrollModule,
    LaddaModule
  ],
  declarations: [
    BannerSearchComponent,
    MarriageHallsComponent,
    MiniHallsComponent,
    BanquetHallsComponent,
    PartyHallsComponent,
    BreadcrumbComponent,
    BookDialogComponent,
    ReserveDialogComponent,
    MapViewDialogComponent,
    BlockCopyPasteDirective,
    AutofocusDirective
    // CvaDateComponent
  ],
  providers: [
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    WINDOW_PROVIDERS
  ]
})
export class SharedModule {}
