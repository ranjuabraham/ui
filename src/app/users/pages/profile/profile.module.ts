import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import {ProfileComponent} from './profile.component';
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

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
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
    CoreModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
