import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CheckoutPreviewComponent} from './checkout-preview/checkout-preview.component';
import {FoodMenuComponent} from './food-menu/food-menu.component';
import {ApprovalRequestComponent} from './approval-request/approval-request.component';
import {FoodMenuEditComponent} from './food-menu-edit/food-menu-edit.component';
import {ConfirmationComponent} from './confirmation/confirmation.component';

const routes: Routes = [
  {path: 'preview', component: CheckoutPreviewComponent},
  {path: 'food-menus', component: FoodMenuComponent},
  {path: 'modify-food-menus', component: FoodMenuEditComponent},
  {path: 'approval-request', component: ApprovalRequestComponent},
  {path: 'confirmation', component: ConfirmationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule {
}
