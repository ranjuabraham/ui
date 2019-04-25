import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutPreviewComponent } from './checkout-preview/checkout-preview.component';
import {SharedModule} from '../../shared/shared.module';
import {BookDialogComponent} from './book-dialog/book-dialog.component';
import {ReserveDialogComponent} from './reserve-dialog/reserve-dialog.component';
import { PolicyDialogComponent } from './policy-dialog/policy-dialog.component';
import { ChargeableAmenitiesDialogComponent } from './chargeable-amenities-dialog/chargeable-amenities-dialog.component';
import {MapViewDialogComponent} from '../halls-list/map-view-dialog/map-view-dialog.component';
import {TimeAgoPipe} from 'time-ago-pipe';
import { ProductGalleryDialogComponent } from './product-gallery-dialog/product-gallery-dialog.component';
import {SlideshowModule} from 'ng-simple-slideshow';
import { ReviewsDialogComponent } from './reviews-dialog/reviews-dialog.component';
import {FoodMenuComponent, SelectedMenusBottomSheetComponent} from './food-menu/food-menu.component';
import { ApprovalRequestComponent } from './approval-request/approval-request.component';
import { FoodMenuEditComponent } from './food-menu-edit/food-menu-edit.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@NgModule({
  declarations: [
    CheckoutPreviewComponent,
    PolicyDialogComponent,
    ChargeableAmenitiesDialogComponent,
    ProductGalleryDialogComponent,
    ReviewsDialogComponent,
    FoodMenuComponent,
    ApprovalRequestComponent,
    FoodMenuEditComponent,
    ConfirmationComponent,
    SelectedMenusBottomSheetComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule,
    SlideshowModule
  ],
  entryComponents: [
   BookDialogComponent,
    ReserveDialogComponent,
    PolicyDialogComponent,
    ChargeableAmenitiesDialogComponent,
    ProductGalleryDialogComponent,
    ReviewsDialogComponent,
    MapViewDialogComponent,
    SelectedMenusBottomSheetComponent
  ],
})
export class CheckoutModule { }
