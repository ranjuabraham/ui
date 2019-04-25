import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VenueDetailsShowComponent} from './venue-details-show/venue-details-show.component';
import {VenueDetailsCreateComponent} from './venue-details-create/venue-details-create.component';
import {VenueDetailsEditComponent} from './venue-details-edit/venue-details-edit.component';

const venueDetailsRoutes: Routes = [
  {path: 'show', component: VenueDetailsShowComponent},
  {path: 'create', component: VenueDetailsCreateComponent},
  {path: 'edit/:prdctDetId', component: VenueDetailsEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(venueDetailsRoutes)],
  exports: [RouterModule]
})
export class VenueDetailsRoutingModule { }
