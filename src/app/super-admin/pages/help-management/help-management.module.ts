import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {HelpManagementRoutingModule} from './help-management-routing.module';
import {HelpShowComponent} from './help-show/help-show.component';
import {HelpCreateComponent} from './help-create/help-create.component';
import {HelpEditComponent} from './help-edit/help-edit.component';
import { DialogShowComponent } from './dialog-show/dialog-show.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    HelpManagementRoutingModule,
    SharedModule
  ],
  declarations: [
    HelpShowComponent,
    HelpCreateComponent,
    HelpEditComponent,
    DialogShowComponent
  ],
  entryComponents: [DialogShowComponent]
})
export class HelpManagementModule {
}
