import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { SharedModule} from '../../../shared/shared.module';
import { NgxCaptchaModule } from 'ngx-captcha';
import { Captcha} from '../../../shared/captcha/captcha';
import { MatButtonToggleModule, MatDialogModule } from '@angular/material';
import { NotificationModule, NotificationService} from '../../../shared/notification';
import { BuffetCategoryShowComponent } from './buffet-category-show/buffet-category-show.component';
import { BuffetCategoryCreateComponent } from './buffet-category-create/buffet-category-create.component';
import { BuffetCategoryUpdateComponent } from './buffet-category-update/buffet-category-update.component';


const routes: Routes = [
  {path: 'create', component: BuffetCategoryCreateComponent, data :{breadcrumb: 'Create'}},
  {path: 'show', component: BuffetCategoryShowComponent, data :{breadcrumb: 'Show'}},
  {path: 'edit/:prdctDetId/:attrId', component: BuffetCategoryUpdateComponent, data :{breadcrumb: 'Edit'}},
  ];


@NgModule({
  declarations: [BuffetCategoryShowComponent, BuffetCategoryCreateComponent, BuffetCategoryUpdateComponent],
  imports: [
      CommonModule,
      SharedModule,
      HttpClientModule,
      NotificationModule,
      RouterModule.forChild(routes)
  ]
})
export class BuffetCategoryModule { }
