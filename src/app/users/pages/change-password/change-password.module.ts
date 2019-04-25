import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePasswordRoutingModule } from './change-password-routing.module';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule, MatPaginatorModule, MatSelectModule,
  MatSidenavModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../core/core.module';
import {ChangePasswordComponent} from './change-password.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatChipsModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    ChangePasswordRoutingModule
  ],
  declarations: [ChangePasswordComponent]
})
export class ChangePasswordModule { }
