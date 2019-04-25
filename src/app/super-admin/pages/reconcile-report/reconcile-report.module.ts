import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReconcileReportRoutingModule } from './reconcile-report-routing.module';
import { ShowComponent } from './show/show.component';
import {HttpClientModule} from '@angular/common/http';

import {CvaDateComponent} from './show/cva-date.component';
import { DialogReconcileReportComponent } from './dialog-reconcile-report/dialog-reconcile-report.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReconcileReportRoutingModule,
    SharedModule
  ],
  declarations: [ShowComponent, CvaDateComponent, DialogReconcileReportComponent],
  entryComponents: [ DialogReconcileReportComponent]
})
export class ReconcileReportModule { }
