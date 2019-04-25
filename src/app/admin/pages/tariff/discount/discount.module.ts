import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { SharedModule} from '../../../shared/shared.module';
import { NgxCaptchaModule } from 'ngx-captcha';
import { Captcha} from '../../../shared/captcha/captcha';
import { MatButtonToggleModule, MatDialogModule } from '@angular/material';
import { NotificationModule, NotificationService} from '../../../shared/notification';
import { DiscountShowComponent } from './discount-show/discount-show.component';
import { DiscountCreateComponent } from './discount-create/discount-create.component';
import { DiscountUpdateComponent } from './discount-update/discount-update.component';

const routes: Routes = [
  {path: 'create', component: DiscountCreateComponent, data: { breadcrumb: 'Create'}},
  {path: 'show', component: DiscountShowComponent, data: { breadcrumb: 'Show'}},
  {path: 'edit/:prdctDetId/:attrId', component: DiscountUpdateComponent, data: { breadcrumb: 'Edit'}},
  ];

@NgModule({
  declarations: [DiscountShowComponent, DiscountCreateComponent, DiscountUpdateComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    NotificationModule,
    RouterModule.forChild(routes)
  ]
})
export class DiscountModule { }
