import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../../../shared/shared.module';

import {NgxCaptchaModule} from 'ngx-captcha';
import {Captcha} from '../../../shared/captcha/captcha';
import {MatButtonToggleModule, MatDialogModule} from '@angular/material';

import {NotificationModule, NotificationService} from '../../../shared/notification';
import {AboutUsCreateComponent} from './about-us-create/about-us-create.component';
import {AboutUsEditComponent} from './about-us-edit/about-us-edit.component';
import {AboutUsShowComponent} from './about-us-show/about-us-show.component';

const routes: Routes = [
  {path: 'about-us/create', component: AboutUsCreateComponent, data: { breadcrumb: 'About Us > Create'}},
  {path: 'about-us/show', component: AboutUsShowComponent, data: { breadcrumb: 'About us'}},
  {path: 'about-us/edit/:prdctDetId/:attrId', component: AboutUsEditComponent, data: { breadcrumb: 'About Us > Edit'}}];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    NotificationModule,
    MatDialogModule,
    NgxCaptchaModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AboutUsShowComponent, AboutUsEditComponent, AboutUsCreateComponent],
  providers: [Captcha],
})
export class AboutUsModule {
}
