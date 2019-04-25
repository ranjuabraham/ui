import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerRoutingModule } from './banner-routing.module';
import { MarriageHallsComponent } from './marriage-halls/marriage-halls.component';
import { MiniHallsComponent } from './mini-halls/mini-halls.component';
import { BanquetHallsComponent } from './banquet-halls/banquet-halls.component';
import { PartyHallsComponent } from './party-halls/party-halls.component';
import {
  MatAutocompleteModule,
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
import { MenusComponent } from './menus/menus.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    BannerRoutingModule,
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
    MatAutocompleteModule,
    MatToolbarModule,
    MatTooltipModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  declarations: [MarriageHallsComponent, MiniHallsComponent, BanquetHallsComponent, PartyHallsComponent, MenusComponent]
})
export class BannerModule { }
