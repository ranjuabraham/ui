import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import { VenueDetailsRoutingModule } from './venue-details-routing.module';
import { VenueDetailsCreateComponent } from './venue-details-create/venue-details-create.component';
import { VenueDetailsEditComponent } from './venue-details-edit/venue-details-edit.component';
import { VenueDetailsShowComponent } from './venue-details-show/venue-details-show.component';
import { VenueDetailsDialogComponent } from './venue-details-dialog/venue-details-dialog.component';
import {SharedModule} from "../../../shared/shared.module";



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    VenueDetailsRoutingModule,
    SharedModule
  ],
  declarations: [VenueDetailsCreateComponent, VenueDetailsEditComponent, VenueDetailsShowComponent, VenueDetailsDialogComponent],
  entryComponents: [
    VenueDetailsDialogComponent
  ],
})
export class VenueDetailsModule { }
