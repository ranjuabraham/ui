import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SearchShowComponent} from './search-show/search-show.component';
import {SearchCreateComponent} from './search-create/search-create.component';
import {SearchEditComponent} from './search-edit/search-edit.component';


const searchCategoryRoutes: Routes = [
  {path: 'show', component: SearchShowComponent},
  {path: 'create', component: SearchCreateComponent},
  {path: 'edit/:searchId', component: SearchEditComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(searchCategoryRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SearchCategoryRouterModule {
}
