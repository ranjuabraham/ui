import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { SharedModule} from '../../../shared/shared.module';
import { NgxCaptchaModule } from 'ngx-captcha';
import { MatButtonToggleModule, MatDialogModule } from '@angular/material';
import { NotificationModule, NotificationService} from '../../../shared/notification';
import { ReservationShowComponent } from './reservation-show/reservation-show.component';
import { ReservationCreateComponent } from './reservation-create/reservation-create.component';
import { ReservationUpdateComponent } from './reservation-update/reservation-update.component';

const routes: Routes = [
  {path: 'create', component: ReservationCreateComponent, data: { breadcrumb: 'Create'}},
  {path: 'show', component: ReservationShowComponent, data: { breadcrumb: 'Show'}},
  {path: 'edit/:prdctDetId/:attrId', component: ReservationUpdateComponent, data: { breadcrumb: 'Edit'}},
  ];

@NgModule({
  declarations: [ReservationShowComponent, ReservationCreateComponent, ReservationUpdateComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    NotificationModule,
    RouterModule.forChild(routes)
  ]
})
export class ReservationModule { }
