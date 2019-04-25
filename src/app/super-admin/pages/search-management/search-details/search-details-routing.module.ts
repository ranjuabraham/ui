import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchDetailsShowComponent} from './search-details-show/search-details-show.component';
import {SearchDetailsCreateComponent} from './search-details-create/search-details-create.component';
import {SearchDetailsEditComponent} from './search-details-edit/search-details-edit.component';

const searchDetailsRoutes: Routes = [
  {path: 'show', component: SearchDetailsShowComponent},
  {path: 'create', component: SearchDetailsCreateComponent},
  {path: 'edit/:searchDetId', component: SearchDetailsEditComponent}
];


@NgModule({
  imports: [RouterModule.forChild(searchDetailsRoutes)],
  exports: [RouterModule]
})
export class SearchDetailsRoutingModule { }
