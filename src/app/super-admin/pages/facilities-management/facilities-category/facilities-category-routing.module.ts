import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FacilityShowComponent} from './facility-show/facility-show.component';
import {FacilityCreateComponent} from './facility-create/facility-create.component';
import {FacilityEditComponent} from './facility-edit/facility-edit.component';

const routes: Routes = [
  {path: 'show', component: FacilityShowComponent},
  {path: 'create', component: FacilityCreateComponent},
  {path: 'edit/:facId', component: FacilityEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacilitiesCategoryRoutingModule {
}
