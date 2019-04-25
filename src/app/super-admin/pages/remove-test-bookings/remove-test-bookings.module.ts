import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RemoveTestBookingsRoutingModule} from './remove-test-bookings-routing.module';
import {ShowComponent} from './show/show.component';
import {HttpClientModule} from '@angular/common/http';

import { DialogComponent } from './dialog/dialog.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RemoveTestBookingsRoutingModule,
    SharedModule
  ],
  declarations: [ShowComponent, DialogComponent],
  entryComponents: [
    DialogComponent
  ],
})
export class RemoveTestBookingsModule {
}
