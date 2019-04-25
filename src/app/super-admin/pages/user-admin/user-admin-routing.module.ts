import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShowComponent} from './show/show.component';
import {EditComponent} from './edit/edit.component';

const routes: Routes = [
  {path: 'show', component: ShowComponent},
  {path: 'edit/:usrId', component: EditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAdminRoutingModule { }
