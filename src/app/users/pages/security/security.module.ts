import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { SecurityComponent } from './security.component';

@NgModule({
  imports: [
    CommonModule,
    SecurityRoutingModule
  ],
  declarations: [SecurityComponent]
})
export class SecurityModule { }
