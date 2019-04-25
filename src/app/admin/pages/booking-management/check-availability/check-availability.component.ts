import { Component, OnInit } from '@angular/core';

import { IMyDpOptions} from "../../../../../packages/my-date-picker/interfaces";
import {BookingManagementService} from "../booking-management.service";
import {ActivatedRoute} from "@angular/router";
import {LoginDialogComponent} from "../../../../users/pages/login-dialog/login-dialog.component";

@Component({
  selector: 'app-check-availability',
  templateUrl: './check-availability.component.html',
  styleUrls: ['./check-availability.component.scss']
})
export class CheckAvailabilityComponent implements OnInit {
  checkAvailability: IMyDpOptions;
  monthLabel = {
    1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June',
    7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December'
  };
  curentDate = new Date();
  public detailsData;
  public blockedDate;
  public highLightsDate;
  public subHalls;
  prdctDetId;
  subHallId = 0;
  public loginData = JSON.parse(localStorage.getItem('userInfo'));

  constructor(private bookingManagementService: BookingManagementService,  private route: ActivatedRoute) { }

  ngOnInit() {
    this.getCheckAvailable();
  }


  onChangeSubHalls(event) {
      const target = event.source.selected._element.nativeElement;
      const selectedData = {
        value: event.value,
        text: target.innerText.trim()
      };
      console.log(target);
      console.log(selectedData.value);
      this.subHallId = selectedData.value;
      this.getCheckAvailable();
  }

  getCheckAvailable() {
    this.bookingManagementService.getCheckAvailable(this.loginData.prdctDetId, this.subHallId)
      .subscribe(res => {
        this.detailsData = res;
        console.log(this.detailsData);
         this.blockedDate = this.detailsData.date.block.dates;
         this.highLightsDate = this.detailsData.date.spec;
         this.subHalls = this.detailsData.halls;
        this.checkAvailability = {
          // other options...
          selectorWidth: '100%',
          selectorHeight: '450px',
          showTodayBtn: false,
          monthLabels: this.monthLabel,
          dateFormat: 'dd-mm-yyyy',
          firstDayOfWeek: 'mo',
          sunHighlight: true,
          inline: true,
          markDates: this.highLightsDate,
          disableDays: this.blockedDate,
          showInputField: true,
          markCurrentDay: true,
          indicateInvalidDate: true,
          monthSelector: false,
          yearSelector: false,
          editableDateField: false,
          material: true,
          height: '34px',
          disableUntil: {year: this.curentDate.getFullYear(), month: this.curentDate.getMonth() + 1, day: this.curentDate.getDate() + 3},
          disableSince: {year: this.curentDate.getFullYear(), month: this.curentDate.getMonth() + 1, day: this.curentDate.getDate() + 180}
        };
      });
  }

}
