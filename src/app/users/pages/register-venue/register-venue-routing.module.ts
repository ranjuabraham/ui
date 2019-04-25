import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterVenueComponent} from './register-venue.component';

const routes: Routes = [
  {path: '', component: RegisterVenueComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterVenueRoutingModule { }
