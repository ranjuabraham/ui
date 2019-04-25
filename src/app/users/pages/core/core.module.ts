import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatMenuModule, MatTabsModule} from '@angular/material';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {
  MatSidenavModule,
  MatSliderModule,
  MatProgressBarModule,
  MatExpansionModule
} from '@angular/material';
import { MyAccountComponent } from './my-account/my-account.component';
import { UserAccountComponent } from './user-account/user-account.component';
import {MatBadgeModule} from '@angular/material';
import {LoginDialogComponent} from '../login-dialog/login-dialog.component';
import {ForgotPasswordComponent} from '../forgot-password/forgot-password.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SignUpComponent} from '../sign-up/sign-up.component';
import { FooterComponent } from './footer/footer.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({

  declarations: [
    SidemenuComponent,
    ToolbarComponent,
    MyAccountComponent,
    UserAccountComponent,
    LoginDialogComponent,
    ForgotPasswordComponent,
    SignUpComponent,
    FooterComponent
  ],

  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    RouterModule,
    PerfectScrollbarModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatTabsModule,
    MatSliderModule,
    MatProgressBarModule,
    MatBadgeModule,
    ReactiveFormsModule,
    FormsModule,
    MatMenuModule,
    MatExpansionModule
  ],


  exports: [
    SidemenuComponent,
    ToolbarComponent,
    LoginDialogComponent,
    ForgotPasswordComponent,
    SignUpComponent,
    FooterComponent
  ],
  entryComponents: [
    LoginDialogComponent, ForgotPasswordComponent, SignUpComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class CoreModule { }
