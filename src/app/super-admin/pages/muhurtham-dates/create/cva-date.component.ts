import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-date',
  template: `
    <mat-form-field style="width: 100%;" appearance="outline" >
      <input matInput [matDatepicker]="picker" (dateInput)="addEvent('input', $event)" [placeholder]="title">
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CvaDateComponent),
      multi: true
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class CvaDateComponent implements ControlValueAccessor {

  @Input()
  _dateValue; // notice the '_'

  @Input() title: string;

  get dateValue() {
    return moment(this._dateValue, 'DD/MM/YYYY');
  }

  set dateValue(val) {
    this._dateValue = moment(val).format('DD/MM/YYYY');
    this.propagateChange(this._dateValue);
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
    this.dateValue = moment(event.value, 'DD/MM/YYYY');
  }

  writeValue(value: any) {
    if (value !== undefined) {
      this.dateValue = moment(value, 'DD/MM/YYYY');
    }
  }
  propagateChange = (_: any) => { };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }
}
