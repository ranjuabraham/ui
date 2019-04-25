import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CookiesRoutingModule } from './cookies-routing.module';
import { CookiesComponent } from './cookies.component';

@NgModule({
  imports: [
    CommonModule,
    CookiesRoutingModule
  ],
  declarations: [CookiesComponent]
})
export class CookiesModule { }
