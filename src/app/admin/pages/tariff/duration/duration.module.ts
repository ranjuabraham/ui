import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { SharedModule} from '../../../shared/shared.module';
import { NgxCaptchaModule } from 'ngx-captcha';
import { Captcha} from '../../../shared/captcha/captcha';
import { MatButtonToggleModule, MatDialogModule } from '@angular/material';
import { NotificationModule, NotificationService} from '../../../shared/notification';
import { DurationShowComponent } from './duration-show/duration-show.component';
import { DurationUpdateComponent } from './duration-update/duration-update.component';
import { DurationCreateComponent } from './duration-create/duration-create.component';
import { DurationDialogComponent } from './duration-dialog/duration-dialog.component';

const routes: Routes = [
  {path: 'create', component: DurationCreateComponent, data: { breadcrumb: 'Create'}},
  {path: 'show', component: DurationShowComponent, data: { breadcrumb: 'Show'}},
  {path: 'edit/:prdctDetId/:attrId', component: DurationUpdateComponent, data: { breadcrumb: 'Edit'}},
  ];


@NgModule({
  declarations: [DurationShowComponent, DurationUpdateComponent, DurationCreateComponent, DurationDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    NotificationModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [DurationDialogComponent]
})
export class DurationModule { }
