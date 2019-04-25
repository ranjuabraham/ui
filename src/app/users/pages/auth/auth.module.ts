import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from '../../../_guards';


import { AuthComponent } from './auth.component';
import {LoginDialogComponent} from '../login-dialog/login-dialog.component';
import {ForgotPasswordComponent} from '../forgot-password/forgot-password.component';
import { appRoutes } from './lazyloader.routes';

import { CoreModule } from '../core/core.module';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    SharedModule,
    CoreModule
  ],
  declarations: [AuthComponent],
  providers: [
    AuthGuard
  ]
})
export class AuthModule { }
