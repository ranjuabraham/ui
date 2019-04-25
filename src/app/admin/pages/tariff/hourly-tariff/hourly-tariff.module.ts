import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { SharedModule} from '../../../shared/shared.module';
import { NgxCaptchaModule } from 'ngx-captcha';
import { Captcha} from '../../../shared/captcha/captcha';
import { MatButtonToggleModule, MatDialogModule } from '@angular/material';
import { NotificationModule, NotificationService} from '../../../shared/notification';
import { HourlyTariffShowComponent } from './hourly-tariff-show/hourly-tariff-show.component';
import { HourlyTariffUpdateComponent } from './hourly-tariff-update/hourly-tariff-update.component';
import { HourlyTariffCreateComponent } from './hourly-tariff-create/hourly-tariff-create.component';

const routes: Routes = [
  {path: 'create', component: HourlyTariffCreateComponent, data: { breadcrumb: 'Create'}},
  {path: 'show', component: HourlyTariffShowComponent, data: { breadcrumb: 'Show'}},
  {path: 'edit/:prdctDetId/:attrId', component: HourlyTariffUpdateComponent, data: { breadcrumb: 'Edit'}},
  ];

@NgModule({
  declarations: [HourlyTariffShowComponent, HourlyTariffUpdateComponent, HourlyTariffCreateComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    NotificationModule,
    RouterModule.forChild(routes)
  ]
})
export class HourlyTariffModule { }
