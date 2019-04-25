import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import { VenueProfileShowComponent } from './venue-profile-show/venue-profile-show.component';
import { VenueProfileCreateComponent } from './venue-profile-create/venue-profile-create.component';
import { VenueProfileEditComponent } from './venue-profile-edit/venue-profile-edit.component';

const routes: Routes = [
  {path: 'create', component: VenueProfileCreateComponent},
  {path: 'show', component: VenueProfileShowComponent},
  {path: 'edit', component: VenueProfileEditComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [VenueProfileShowComponent, VenueProfileCreateComponent, VenueProfileEditComponent],
})

export class VenueProfileModule { }
