import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { SharedModule} from '../../../shared/shared.module';
import { HttpClientModule} from '@angular/common/http';
import { NotificationModule, NotificationService} from '../../../shared/notification';
import { HallDetailsShowComponent } from './hall-details-show/hall-details-show.component';
import { HallDetailsEditComponent } from './hall-details-edit/hall-details-edit.component';
import { HallDetailsCreateComponent } from './hall-details-create/hall-details-create.component';
import { HallDetailsDialogComponent } from './hall-details-dialog/hall-details-dialog.component';

const routes: Routes = [
  {path: 'create', component: HallDetailsCreateComponent},
  {path: 'show', component: HallDetailsShowComponent},
  {path: 'edit/:prdctDetId/:attrId', component: HallDetailsEditComponent}
  ];

@NgModule({
  declarations: [HallDetailsShowComponent, HallDetailsEditComponent, HallDetailsCreateComponent, HallDetailsCreateComponent, HallDetailsDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    NotificationModule,
    RouterModule.forChild(routes)
  ], 
  entryComponents :[HallDetailsDialogComponent]
})
export class HallDetailsModule { }
