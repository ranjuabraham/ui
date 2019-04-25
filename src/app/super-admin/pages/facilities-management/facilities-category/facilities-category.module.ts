import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


import {HttpClientModule} from '@angular/common/http';

import { FacilitiesCategoryRoutingModule } from './facilities-category-routing.module';
import {FacilityShowComponent} from './facility-show/facility-show.component';
import {FacilityEditComponent} from './facility-edit/facility-edit.component';
import {FacilityCreateComponent} from './facility-create/facility-create.component';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FacilitiesCategoryRoutingModule,
    SharedModule
  ],
  declarations: [
    FacilityShowComponent,
    FacilityEditComponent,
    FacilityCreateComponent
  ],
  exports: [],
})
export class FacilitiesCategoryModule { }
