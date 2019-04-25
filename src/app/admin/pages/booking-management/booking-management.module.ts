import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule} from "../../shared/shared.module";
import {MyDatePickerModule} from '../../../../packages/my-date-picker';

import { BookingManagementRoutingModule } from './booking-management-routing.module';
import { CheckAvailabilityComponent } from './check-availability/check-availability.component';


@NgModule({
  declarations: [CheckAvailabilityComponent],
  imports: [
    CommonModule,
    BookingManagementRoutingModule,
    SharedModule,
    MyDatePickerModule
  ]
})
export class BookingManagementModule { }
