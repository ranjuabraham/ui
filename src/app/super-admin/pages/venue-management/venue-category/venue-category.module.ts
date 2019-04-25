import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import {SharedModule} from "../../../shared/shared.module";



import {HttpClientModule} from '@angular/common/http';
import {VenueCategoryRouterModule} from './venue-category.router';
import {VenueShowComponent} from './venue-show/venue-show.component';
import { VenueCategoryEditComponent } from './venue-category-edit/venue-category-edit.component';
import { VenueCategoryCreateComponent } from './venue-category-create/venue-category-create.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    VenueCategoryRouterModule,
    SharedModule
  ],
  declarations: [VenueShowComponent, VenueCategoryEditComponent, VenueCategoryCreateComponent],
})
export class VenueCategoryModule {
}


