import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessReviewsRoutingModule } from './process-reviews-routing.module';
import { ShowComponent } from './show/show.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    ProcessReviewsRoutingModule,
    SharedModule
  ],
  declarations: [ShowComponent]
})
export class ProcessReviewsModule { }
