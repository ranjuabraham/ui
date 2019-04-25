import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { PurgeDataRoutingModule } from './purge-data-routing.module';
import { DialogComponent } from './dialog/dialog.component';
import { ShowComponent } from './show/show.component';
import { ResponseDialogComponent } from './response-dialog/response-dialog.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    PurgeDataRoutingModule,
    SharedModule
  ],
  declarations: [DialogComponent, ShowComponent, ResponseDialogComponent],
  entryComponents: [
    DialogComponent, ResponseDialogComponent
  ],
})
export class PurgeDataModule { }
