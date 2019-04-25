import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../../shared/shared.module';
import {NotificationModule, NotificationService} from '../../shared/notification';
import {OnlineBookingDialogComponent} from './online-booking-dialog/online-booking-dialog.component';
import {OfflineTransactionDialogComponent} from './offline-transaction-dialog/offline-transaction-dialog.component';
import {OfflineTransactionShowComponent} from './offline-transaction-show/offline-transaction-show.component';
import {OfflineTransactionUpdateComponent} from './offline-transaction-update/offline-transaction-update.component';
import { OnlineTransactionBookingComponent } from './online-transaction-booking/online-transaction-booking.component';
import { OnlineTransactionReservationComponent } from './online-transaction-reservation/online-transaction-reservation.component';
import { OnlineTransactionUpdateComponent } from './online-transaction-update/online-transaction-update.component';

const routes: Routes = [
  {path: 'online-bookings', component: OnlineTransactionBookingComponent, data: {breadcrumb: 'Bookings'}},
  {path: 'online-reservations', component: OnlineTransactionReservationComponent, data: {breadcrumb: 'Reservations'}},
  {path: 'offline-transaction', component: OfflineTransactionShowComponent, data: {breadcrumb: 'Offline-Display'}},
  {
    path: 'update/:prdctDetId/:txnId',
    component: OfflineTransactionUpdateComponent,
    data: {breadcrumb: 'Transaction-Update'}
  },
  {
    path: 'status/:prdctDetId/:txnId/:blockType',
    component: OnlineTransactionUpdateComponent,
    data: {breadcrumb: 'Status-Update'}
  },
];

@NgModule({
  declarations: [
    OnlineBookingDialogComponent,
    OfflineTransactionDialogComponent,
    OfflineTransactionShowComponent,
    OfflineTransactionUpdateComponent,
    OnlineTransactionBookingComponent,
    OnlineTransactionReservationComponent,
    OnlineTransactionUpdateComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    NotificationModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [OnlineBookingDialogComponent, OfflineTransactionDialogComponent]
})

export class UpdateTransactionModule {
}
