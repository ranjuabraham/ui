import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth.component';
import {AuthGuard} from '../../../_guards';

export const appRoutes: Routes = [{
  path: '', component: AuthComponent, children: [
    {path: 'offline', loadChildren: '../offline-booking/offline-booking.module#OfflineBookingModule'},
  ]
}];
