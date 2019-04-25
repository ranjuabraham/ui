import { Component, Input, forwardRef} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { NativeDateAdapter } from '@angular/material';
import * as moment from 'moment';

export class AppDateAdapter extends NativeDateAdapter {

  format(date: Date, displayFormat: string): string {
    if (displayFormat === 'input') {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const weekname = date.toString();
      console.log(day);
      console.log('dete1-----');

      return this._to2digit(day) + '/' + this._to2digit(month) + '/' + year;
    } else if (displayFormat === 'inputMonth') {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      console.log(day);
      console.log('dete-2-----');
      // Highlight the 1st and 20th day of each month.
      // return (day === 1 || day === 2) ? 'example-custom-date-class' : undefined;
      return this._to2digit(month) + '/' + year;
    } else {
      console.log('dete-3-----');
      return date.toDateString();
    }
  }

  private _to2digit(n: number) {
    return ('00' + n).slice(-2);
  }

}
export const APP_DATE_FORMATS = {
  parse: {
    dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
  },
  display: {
    // dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
    dateInput: 'input',
    // monthYearLabel: { month: 'short', year: 'numeric', day: 'numeric' },
    monthYearLabel: 'inputMonth',
    dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
    monthYearA11yLabel: {year: 'numeric', month: 'long'},
  }
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

    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    {provide: DateAdapter, useClass: AppDateAdapter}
  ]
})



export class CvaDateComponent implements ControlValueAccessor {
  dateClass;
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
    // console.log(event.value);
    this.dateClass = (d: Date) => {
      const date = d.getDate();
      console.log(d.getDate);
      // Highlight the 1st and 20th day of each month.
      return (date === 1 || date === 15) ? 'example-custom-date-class' : undefined;
    }
    console.log('d');
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
