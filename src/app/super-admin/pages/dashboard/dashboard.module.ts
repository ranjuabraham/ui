import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';

export const appRoutes: Routes = [
  {path: '', component: DashboardComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    FlexLayoutModule,
    MatCardModule,
  ],
  declarations: [DashboardComponent],
  exports: []
})
export class DashboardModule {
}
