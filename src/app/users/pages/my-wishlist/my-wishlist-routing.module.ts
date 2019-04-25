import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MyWishlistComponent} from './my-wishlist.component';

const routes: Routes = [
  {path: '', component: MyWishlistComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyWishlistRoutingModule { }
