import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { MyDatePickerComponent } from './my-date-picker.component';
import { FocusDirective } from './directives/my-date-picker.focus.directive';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule, MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';
// import {SharedModule} from '../../app/shared/shared.module';

@NgModule({
    imports: [CommonModule,
      FlexLayoutModule,
      MatAutocompleteModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatCardModule,
      MatCheckboxModule,
      MatChipsModule,
      MatDatepickerModule,
      MatDialogModule,
      MatExpansionModule,
      MatGridListModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatMenuModule,
      MatNativeDateModule,
      MatPaginatorModule,
      MatProgressBarModule,
      MatProgressSpinnerModule,
      MatRadioModule,
      MatRippleModule,
      MatSelectModule,
      MatSidenavModule,
      MatSliderModule,
      MatSlideToggleModule,
      MatSnackBarModule,
      MatSortModule,
      MatTableModule,
      MatTabsModule,
      MatToolbarModule,
      MatTooltipModule,
      MatStepperModule,
      FlexLayoutModule,
      ReactiveFormsModule,
      FormsModule,
      // SharedModule
    ],
    declarations: [MyDatePickerComponent, FocusDirective],
    exports: [MyDatePickerComponent, FocusDirective]
})
export class MyDatePickerModule {
}
