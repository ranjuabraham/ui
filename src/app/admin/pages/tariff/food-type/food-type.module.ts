import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { SharedModule} from '../../../shared/shared.module';
import { NgxCaptchaModule } from 'ngx-captcha';
import { Captcha} from '../../../shared/captcha/captcha';
import { MatButtonToggleModule, MatDialogModule } from '@angular/material';
import { NotificationModule, NotificationService} from '../../../shared/notification';
import { FoodTypeShowComponent } from './food-type-show/food-type-show.component';
import { FoodTypeCreateComponent } from './food-type-create/food-type-create.component';
import { FoodTypeUpdateComponent } from './food-type-update/food-type-update.component';

const routes: Routes = [
  {path: 'create', component: FoodTypeCreateComponent, data: { breadcrumb: 'Create'}},
  {path: 'show', component: FoodTypeShowComponent, data: { breadcrumb: 'Show'}},
  {path: 'edit/:prdctDetId/:foodTypId', component: FoodTypeUpdateComponent, data: { breadcrumb: 'Edit'}},
  ];

@NgModule({
  declarations: [FoodTypeShowComponent, FoodTypeCreateComponent, FoodTypeUpdateComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    NotificationModule,
    RouterModule.forChild(routes)
  ]
})
export class FoodTypeModule { }
