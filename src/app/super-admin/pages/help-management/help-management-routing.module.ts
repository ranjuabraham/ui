import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HelpShowComponent} from './help-show/help-show.component';
import {HelpCreateComponent} from './help-create/help-create.component';
import {HelpEditComponent} from './help-edit/help-edit.component';

const helpManagementRoutes: Routes = [
  {path: 'show', component: HelpShowComponent},
  {path: 'create', component: HelpCreateComponent},
  {path: 'edit/:helpId', component: HelpEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(helpManagementRoutes)],
  exports: [RouterModule]
})
export class HelpManagementRoutingModule { }
