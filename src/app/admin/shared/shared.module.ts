import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule,
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
  MatStepperModule } from '@angular/material';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
  suppressScrollX: true
};

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import {NgSelectModule} from '@ng-select/ng-select';
import { QuillModule } from 'ngx-quill';
import { RecaptchaModule } from 'ng-recaptcha';
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
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
    QuillModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  exports: [
    RouterModule,
    SwiperModule,
    FlexLayoutModule,
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
    MatStepperModule,
    PerfectScrollbarModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    BreadcrumbComponent,
    QuillModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  declarations: [
    BreadcrumbComponent,
  ],
  providers: [
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6LcMYXIUAAAAAJhiVrJOkrbypA18_Xz98SIoAhVM' } as RecaptchaSettings,
    },
  ]
})
export class SharedModule {}
