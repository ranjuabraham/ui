import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VenueAdminReminderRoutingModule } from './venue-admin-reminder-routing.module';
import { ShowComponent } from './show/show.component';
import {HttpClientModule} from '@angular/common/http';
import { SendSmsDialogComponent } from './send-sms-dialog/send-sms-dialog.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    VenueAdminReminderRoutingModule,
    SharedModule
  ],
  declarations: [ShowComponent, SendSmsDialogComponent],
  entryComponents: [
    SendSmsDialogComponent
  ]
})
export class VenueAdminReminderModule { }
