import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyWishlistRoutingModule } from './my-wishlist-routing.module';
import { MyWishlistComponent } from './my-wishlist.component';
import {SharedModule} from "../../shared/shared.module";


import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../core/core.module';
import { DialogComponent } from './dialog/dialog.component';
import {CheckAvailabilityDialogComponent} from "./check-availability-dialog/check-availability-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    MyWishlistRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    SharedModule
  ],
  declarations: [MyWishlistComponent, DialogComponent, CheckAvailabilityDialogComponent],
  entryComponents: [
    DialogComponent, CheckAvailabilityDialogComponent
  ],

})
export class MyWishlistModule { }
