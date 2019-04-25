import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { SharedModule} from '../../../shared/shared.module';
import { NgxCaptchaModule } from 'ngx-captcha';
import { Captcha} from '../../../shared/captcha/captcha';
import { MatButtonToggleModule, MatDialogModule } from '@angular/material';
import { NotificationModule, NotificationService} from '../../../shared/notification';
import { CostMappingShowComponent } from './cost-mapping-show/cost-mapping-show.component';
import { CostMappingCreateComponent } from './cost-mapping-create/cost-mapping-create.component';
import { CostMappingUpdateComponent } from './cost-mapping-update/cost-mapping-update.component';
import { CostMappingDialogComponent } from './cost-mapping-dialog/cost-mapping-dialog.component';



const routes: Routes = [
  {path: 'create', component: CostMappingCreateComponent, data: { breadcrumb: 'Create'}},
  {path: 'show', component: CostMappingShowComponent, data: { breadcrumb: 'Show'}},
  {path: 'edit/:prdctDetId/:attrId', component: CostMappingUpdateComponent, data: { breadcrumb: 'Edit'}},
  ];

@NgModule({
  declarations: [CostMappingShowComponent, CostMappingCreateComponent, CostMappingUpdateComponent, CostMappingDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    NotificationModule,
    RouterModule.forChild(routes)
  ],
  entryComponents:[CostMappingDialogComponent]
})
export class CostMappingModule { }
