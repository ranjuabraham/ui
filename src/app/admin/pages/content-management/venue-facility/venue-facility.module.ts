import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { NotificationModule, NotificationService} from '../../../shared/notification';
import { VenueFacilityShowComponent } from './venue-facility-show/venue-facility-show.component';
import { VenueFacilityEditComponent } from './venue-facility-edit/venue-facility-edit.component';
import { VenueFacilityCreateComponent } from './venue-facility-create/venue-facility-create.component';

const routes: Routes = [
  {path: 'create', component: VenueFacilityCreateComponent, data: { breadcrumb: 'Create'}},
  {path: 'show', component: VenueFacilityShowComponent, data: { breadcrumb: 'Show'}},
  {path: 'edit', component: VenueFacilityEditComponent, data: { breadcrumb: 'Edit'}}
  ];

@NgModule({
  declarations: [VenueFacilityShowComponent, VenueFacilityEditComponent, VenueFacilityCreateComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    NotificationModule,
    RouterModule.forChild(routes)
  ]
})

export class VenueFacilityModule {
  
 }
