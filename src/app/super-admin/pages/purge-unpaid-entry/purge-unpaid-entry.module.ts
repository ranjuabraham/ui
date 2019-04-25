import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurgeUnpaidEntryRoutingModule } from './purge-unpaid-entry-routing.module';
import { ShowComponent } from './show/show.component';
import { DialogComponent } from './dialog/dialog.component';
import { ResponseDialogComponent } from './response-dialog/response-dialog.component';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    PurgeUnpaidEntryRoutingModule
  ],
  declarations: [ShowComponent, DialogComponent, ResponseDialogComponent],
  entryComponents: [
    DialogComponent, ResponseDialogComponent
  ],
})
export class PurgeUnpaidEntryModule { }
