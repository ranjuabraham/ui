import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingMenuComponent } from './booking-menu/booking-menu.component';
import { MyBookingComponent } from './my-booking/my-booking.component';
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
  MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatSelectModule,
  MatSidenavModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule,
  MatToolbarModule, MatTooltipModule, MatBadgeModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { HistoricalReservationsComponent } from './historical-reservations/historical-reservations.component';
import { HistoricalBookingsComponent } from './historical-bookings/historical-bookings.component';
import {PayNowComponent} from './pay-now/pay-now.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    BookingRoutingModule,
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
    SharedModule
  ],
  declarations: [BookingMenuComponent,  MyBookingComponent,
    MyReservationsComponent, HistoricalReservationsComponent, HistoricalBookingsComponent, PayNowComponent]
})
export class BookingModule { }
