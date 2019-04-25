import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {SearchCategoryRouterModule} from './search-category.router';
import {SearchShowComponent} from './search-show/search-show.component';
import {SearchCreateComponent} from './search-create/search-create.component';
import {SearchEditComponent} from './search-edit/search-edit.component';
import {SharedModule} from "../../../shared/shared.module";



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SearchCategoryRouterModule,
    SharedModule
  ],
  declarations: [SearchShowComponent, SearchCreateComponent, SearchEditComponent],
  exports: [],
})
export class SearchCategoryModule {
}


