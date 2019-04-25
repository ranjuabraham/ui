import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { SharedModule} from '../../../shared/shared.module';
import { NgxCaptchaModule } from 'ngx-captcha';
import { Captcha} from '../../../shared/captcha/captcha';
import { MatButtonToggleModule, MatDialogModule } from '@angular/material';
import { NotificationModule, NotificationService} from '../../../shared/notification';
import { BuffetMasterShowComponent } from './buffet-master-show/buffet-master-show.component';
import { BuffetMasterCreateComponent } from './buffet-master-create/buffet-master-create.component';
import { BuffetMasterUpdateComponent } from './buffet-master-update/buffet-master-update.component';
import { BuffetMasterDialogComponent } from './buffet-master-dialog/buffet-master-dialog.component';


const routes: Routes = [
  {path: 'create', component: BuffetMasterCreateComponent, data :{breadcrumb: 'Create'}},
  {path: 'show', component: BuffetMasterShowComponent, data :{breadcrumb: 'Show'}},
  {path: 'edit/:prdctDetId/:attrId', component: BuffetMasterUpdateComponent, data :{breadcrumb: 'Edit'}},
  ];

@NgModule({
  declarations: [BuffetMasterShowComponent, BuffetMasterCreateComponent, BuffetMasterUpdateComponent, BuffetMasterDialogComponent],
  imports: [
    CommonModule,
      CommonModule,
      SharedModule,
      HttpClientModule,
      NotificationModule,
      RouterModule.forChild(routes)
  ],
  entryComponents:[BuffetMasterDialogComponent]
})

export class BuffetMasterModule { }
