import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import { HomeComponent } from './home.component';


export const routes: Routes = [{
  path: '', component: HomeComponent, children: [
    {path: '', loadChildren: '../banner/banner.module#BannerModule'},
  ]
}];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    HomeComponent,
  ],
  providers: []
})
export class HomeModule { }
