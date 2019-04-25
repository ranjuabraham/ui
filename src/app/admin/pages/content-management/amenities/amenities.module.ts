import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { SharedModule} from '../../../shared/shared.module';
import { NotificationModule, NotificationService} from '../../../shared/notification';
import { HttpClientModule} from '@angular/common/http';
import { AmenitiesShowComponent } from './amenities-show/amenities-show.component';
import { AmenitiesEditComponent } from './amenities-edit/amenities-edit.component';
import { AmenitiesCreateComponent } from './amenities-create/amenities-create.component';

const routes: Routes = [
  {path: 'create', component: AmenitiesCreateComponent, data: { breadcrumb: 'Create'}},
  {path: 'show', component: AmenitiesShowComponent, data: { breadcrumb: 'Show'}},
  {path: 'edit/:prdctDetId/:attrId', component: AmenitiesEditComponent, data: { breadcrumb: 'Edit'}},
  ];

@NgModule({
  declarations: [AmenitiesShowComponent, AmenitiesEditComponent, AmenitiesCreateComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    NotificationModule,
    RouterModule.forChild(routes)
  ]
})

export class AmenitiesModule { }
