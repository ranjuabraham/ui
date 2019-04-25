import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VenueShowComponent} from './venue-show/venue-show.component';
import {VenueCategoryEditComponent} from './venue-category-edit/venue-category-edit.component';
import {VenueCategoryCreateComponent} from './venue-category-create/venue-category-create.component';


const venueCategoryRoutes: Routes = [
  {path: 'show', component: VenueShowComponent, data: {breadcrumb: 'Show'}},
  {path: 'create', component: VenueCategoryCreateComponent},
  {path: 'edit/:prdctId', component: VenueCategoryEditComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(venueCategoryRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class VenueCategoryRouterModule {
}
