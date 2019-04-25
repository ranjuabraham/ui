import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { SharedModule} from '../../../shared/shared.module';
import { NgxCaptchaModule } from 'ngx-captcha';
import { Captcha} from '../../../shared/captcha/captcha';
import { MatButtonToggleModule, MatDialogModule } from '@angular/material';
import { NotificationModule, NotificationService} from '../../../shared/notification';
import { PaxCountShowComponent } from './pax-count-show/pax-count-show.component';
import { PaxCountCreateComponent } from './pax-count-create/pax-count-create.component';
import { PaxCountUpdateComponent } from './pax-count-update/pax-count-update.component';

const routes: Routes = [
  {path: 'create', component: PaxCountCreateComponent, data: { breadcrumb: 'Create'}},
  {path: 'show', component: PaxCountShowComponent, data: { breadcrumb: 'Show'}},
  {path: 'edit/:prdctDetId/:attrId', component: PaxCountUpdateComponent, data: { breadcrumb: 'Edit'}},
  ];

@NgModule({
  declarations: [PaxCountShowComponent, PaxCountCreateComponent, PaxCountUpdateComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    NotificationModule,
    RouterModule.forChild(routes)
  ]
})

export class PaxCountModule { }
