import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MyBookingComponent} from './my-booking/my-booking.component';
import {MyReservationsComponent} from './my-reservations/my-reservations.component';
import {HistoricalBookingsComponent} from './historical-bookings/historical-bookings.component';
import {HistoricalReservationsComponent} from './historical-reservations/historical-reservations.component';
import {PayNowComponent} from './pay-now/pay-now.component';

const routes: Routes = [
  {path: 'my-booking', component: MyBookingComponent},
  {path: 'my-reservations', component: MyReservationsComponent},
  {path: 'historical-bookings', component: HistoricalBookingsComponent},
  {path: 'historical-reservations', component: HistoricalReservationsComponent},
  {path: 'pay-now', component: PayNowComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
