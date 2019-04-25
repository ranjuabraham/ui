import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookReserveComponent } from './book-reserve/book-reserve.component';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {NgxGalleryModule} from "ngx-gallery";
import {CheckoutPreviewComponent} from "./checkout-preview/checkout-preview.component";
import {BookDialogComponent} from "./book-dialog/book-dialog.component";
import {ReserveDialogComponent} from "./reserve-dialog/reserve-dialog.component";
import {PolicyDialogComponent} from "./policy-dialog/policy-dialog.component";
import {ChargeableAmenitiesDialogComponent} from "./chargeable-amenities-dialog/chargeable-amenities-dialog.component";
import {ReviewsDialogComponent} from "./reviews-dialog/reviews-dialog.component";
import {MapViewDialogComponent} from "./map-view-dialog/map-view-dialog.component";
import {FoodMenuComponent, SelectedMenusBottomSheetComponent} from "./food-menu/food-menu.component";
import { QuickBlockComponent } from './quick-block/quick-block.component';
export const routes = [
  {path: 'book-reserve', component: BookReserveComponent},
  {path: 'preview', component: CheckoutPreviewComponent},
  {path: 'food-menus', component: FoodMenuComponent},
  {path: 'quick-block', component: QuickBlockComponent},
];

@NgModule({
  declarations: [BookReserveComponent, CheckoutPreviewComponent,
    BookDialogComponent, ReserveDialogComponent,
    PolicyDialogComponent, ChargeableAmenitiesDialogComponent, ReviewsDialogComponent, MapViewDialogComponent, FoodMenuComponent, SelectedMenusBottomSheetComponent, QuickBlockComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgxGalleryModule,
  ],
  entryComponents: [
    BookDialogComponent,
    ReserveDialogComponent,
    PolicyDialogComponent,
    ChargeableAmenitiesDialogComponent,
    ReviewsDialogComponent,
    MapViewDialogComponent,
    SelectedMenusBottomSheetComponent
  ]
})
export class OfflineBookingModule { }
