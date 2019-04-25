import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackComponent } from './feedback.component';
import {
  MatBadgeModule,
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

@NgModule({
  imports: [
    CommonModule,
    FeedbackRoutingModule,
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
  declarations: [FeedbackComponent]
})
export class FeedbackModule { }
