import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyReportComponent, MyReportDialogComponent} from './my-report.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import { MyDatePickerModule } from 'mydatepicker';


const routes: Routes = [
  {path: '', component: MyReportComponent, data: {breadcrumb: 'My Report'}}
];

@NgModule({
  declarations: [MyReportComponent, MyReportDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MyDatePickerModule
  ],
  entryComponents: [MyReportDialogComponent]
})
export class MyReportModule { }
