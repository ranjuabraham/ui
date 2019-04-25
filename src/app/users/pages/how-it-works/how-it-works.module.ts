import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HowItWorksRoutingModule } from './how-it-works-routing.module';
import { HowItWorksComponent } from './how-it-works.component';
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

@NgModule({
  imports: [
    CommonModule,
    HowItWorksRoutingModule,
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
    MatBadgeModule,
    MatToolbarModule,
    MatTooltipModule,
    HttpClientModule,
    FlexLayoutModule,
  ],
  declarations: [HowItWorksComponent]
})
export class HowItWorksModule { }
