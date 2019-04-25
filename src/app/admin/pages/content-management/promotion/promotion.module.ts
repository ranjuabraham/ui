import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { SharedModule} from '../../../shared/shared.module';
import { NotificationModule, NotificationService} from '../../../shared/notification';
import { PromotionShowComponent } from './promotion-show/promotion-show.component';
import { PromotionCreateComponent } from './promotion-create/promotion-create.component';
import { PromotionEditComponent } from './promotion-edit/promotion-edit.component';
import { PromotionDialogComponent } from './promotion-dialog/promotion-dialog.component';

const routes: Routes = [
  {path: 'create', component: PromotionCreateComponent, data: { breadcrumb: 'Create'}},
  {path: 'show', component: PromotionShowComponent, data: { breadcrumb: 'Show'}},
  {path: 'edit/:prdctDetId/:attrId', component: PromotionEditComponent, data: { breadcrumb: 'Edit'}}
  ];

@NgModule({
  declarations: [PromotionShowComponent, PromotionCreateComponent, PromotionEditComponent, PromotionDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    // NgxEditorModule,
    HttpClientModule,
    NotificationModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [PromotionDialogComponent]
})
export class PromotionModule { }
