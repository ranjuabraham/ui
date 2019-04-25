import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


import {HttpClientModule} from '@angular/common/http';

import { SearchDetailsRoutingModule } from './search-details-routing.module';
import { SearchDetailsShowComponent } from './search-details-show/search-details-show.component';
import { SearchDetailsCreateComponent } from './search-details-create/search-details-create.component';
import { SearchDetailsEditComponent } from './search-details-edit/search-details-edit.component';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SearchDetailsRoutingModule,
    SharedModule
  ],
  declarations: [SearchDetailsShowComponent, SearchDetailsCreateComponent, SearchDetailsEditComponent],
})
export class SearchDetailsModule { }
