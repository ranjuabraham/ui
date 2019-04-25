import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CheckAvailabilityComponent} from "./check-availability/check-availability.component";

const routes: Routes = [
  {path: 'check-availability', component: CheckAvailabilityComponent, data: { breadcrumb: 'Check Availability'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingManagementRoutingModule { }
