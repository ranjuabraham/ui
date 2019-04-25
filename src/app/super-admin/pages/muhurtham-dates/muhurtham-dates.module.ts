import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import { MuhurthamDatesRoutingModule } from './muhurtham-dates-routing.module';

import {CreateComponent} from './create/create.component';
import {CvaDateComponent} from './create/cva-date.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MuhurthamDatesRoutingModule,
    SharedModule
  ],
  declarations: [CreateComponent, CvaDateComponent],
})
export class MuhurthamDatesModule { }
