import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAdminRoutingModule } from './user-admin-routing.module';
import { ShowComponent } from './show/show.component';
import {HttpClientModule} from '@angular/common/http';
import { EditComponent } from './edit/edit.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    UserAdminRoutingModule,
    SharedModule
  ],
  declarations: [ShowComponent, EditComponent]
})
export class UserAdminModule { }
