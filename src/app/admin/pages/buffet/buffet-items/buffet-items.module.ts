import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { SharedModule} from '../../../shared/shared.module';
import { NgxCaptchaModule } from 'ngx-captcha';
import { Captcha} from '../../../shared/captcha/captcha';
import { MatButtonToggleModule, MatDialogModule } from '@angular/material';
import { NotificationModule, NotificationService} from '../../../shared/notification';
import { BuffetItemsShowComponent } from './buffet-items-show/buffet-items-show.component';
import { BuffetItemsCreateComponent } from './buffet-items-create/buffet-items-create.component';
import { BuffetItemsUpdateComponent } from './buffet-items-update/buffet-items-update.component';

const routes: Routes = [
  {path: 'create', component: BuffetItemsCreateComponent, data :{breadcrumb: 'Create'}},
  {path: 'show', component: BuffetItemsShowComponent, data :{breadcrumb: 'Show'}},
  {path: 'edit/:prdctDetId/:masterId/:attrId', component: BuffetItemsUpdateComponent, data :{breadcrumb: 'Edit'}},
  ];
  
@NgModule({
  declarations: [BuffetItemsShowComponent, BuffetItemsCreateComponent, BuffetItemsUpdateComponent],
  imports: [
      CommonModule,
      SharedModule,
      HttpClientModule,
      NotificationModule,
      RouterModule.forChild(routes)
  ]
})
export class BuffetItemsModule { }
