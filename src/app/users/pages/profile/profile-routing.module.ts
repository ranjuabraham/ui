import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from './profile.component';
import {ChangePasswordComponent} from '../change-password/change-password.component';

const routes: Routes = [
  {path: '', component: ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
