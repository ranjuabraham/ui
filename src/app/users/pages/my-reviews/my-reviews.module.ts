import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyReviewsRoutingModule } from './my-reviews-routing.module';
import { MyReviewsComponent } from './my-reviews.component';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule, MatPaginatorModule, MatSelectModule,
  MatSidenavModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../core/core.module';
import {FeedbackComponent} from './feedback/feedback.component';
import {RatingComponent} from './rating/rating.component';
@NgModule({
  imports: [
    CommonModule,
    MyReviewsRoutingModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatChipsModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
  ],
  declarations: [MyReviewsComponent, FeedbackComponent, RatingComponent]
})
export class MyReviewsModule { }
