import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MyReviewsComponent} from './my-reviews.component';
import {FeedbackComponent} from './feedback/feedback.component';

const routes: Routes = [
  {path: '', component: MyReviewsComponent},
  {path: 'edit/:rvwId', component: FeedbackComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyReviewsRoutingModule { }
