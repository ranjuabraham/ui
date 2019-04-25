import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ShowComponent } from './show/show.component';
import { FilterComponent } from './filter/filter.component';
import {HttpClientModule} from '@angular/common/http';
import {CvaDateComponent} from './filter/cva-date.component';
import { DialogReportComponent } from './dialog-report/dialog-report.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReportRoutingModule,
    SharedModule
  ],
  declarations: [ShowComponent, FilterComponent, CvaDateComponent, DialogReportComponent],
  entryComponents: [
    DialogReportComponent
  ]
})
export class ReportModule { }
