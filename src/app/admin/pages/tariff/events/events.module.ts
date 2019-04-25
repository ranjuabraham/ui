import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { SharedModule} from '../../../shared/shared.module';
import { NgxCaptchaModule } from 'ngx-captcha';
import { Captcha} from '../../../shared/captcha/captcha';
import { MatButtonToggleModule, MatDialogModule } from '@angular/material';
import { NotificationModule, NotificationService} from '../../../shared/notification';
import { EventsShowComponent } from './events-show/events-show.component';
import { EventsCreateComponent } from './events-create/events-create.component';
import { EventsUpdateComponent } from './events-update/events-update.component';

const routes: Routes = [
  {path: 'create', component: EventsCreateComponent, data: { breadcrumb: 'Create'}},
  {path: 'show', component: EventsShowComponent, data: { breadcrumb: 'Show'}},
  {path: 'edit/:prdctDetId/:eventId', component: EventsUpdateComponent, data: { breadcrumb: 'Edit'}},
  ];

@NgModule({
  declarations: [EventsShowComponent, EventsCreateComponent, EventsUpdateComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    NotificationModule,
    RouterModule.forChild(routes)
  ]
})

export class EventsModule {

 }
