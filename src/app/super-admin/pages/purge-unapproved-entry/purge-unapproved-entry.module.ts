import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurgeUnapprovedEntryRoutingModule } from './purge-unapproved-entry-routing.module';
import { ShowComponent } from './show/show.component';
import { DialogComponent } from './dialog/dialog.component';
import { ResponseDialogComponent } from './response-dialog/response-dialog.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    PurgeUnapprovedEntryRoutingModule,
    SharedModule
  ],
  declarations: [ShowComponent, DialogComponent, ResponseDialogComponent],
  entryComponents: [
    DialogComponent, ResponseDialogComponent
  ],
})
export class PurgeUnapprovedEntryModule { }
