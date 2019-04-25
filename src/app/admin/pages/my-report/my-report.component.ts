import {Component, OnInit, ViewChild, Inject, ElementRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Router} from "@angular/router";

import {IMyDpOptions} from 'mydatepicker';
import {MyReport} from "./my-report";
import * as XLSX from 'xlsx';
import {formatDate } from '@angular/common';

import {MyReportService} from "./my-report.service";


export interface Categories {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-my-report',
  templateUrl: './my-report.component.html',
  styleUrls: ['./my-report.component.scss']
})
export class MyReportComponent implements OnInit {
  filterForm: FormGroup;
  public userInfo = JSON.parse(localStorage.getItem('userInfo'));
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  displayedColumns: string[] = ['dcdeHdr', 'bookedOn', 'bookedBy', 'muhurtDts', 'expDt', 'evtName', 'durName', 'status', 'paidStatus', 'action'];
  dataSource: MatTableDataSource<MyReport>;
  restItems: any;
  blockType = '1';
  startDate = '';
  endDate = '';
  today = new Date();
  currentDate = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('TABLES') tables: ElementRef;
  categories: Categories[] = [
    {value: '1', viewValue: ' Active Bookings'},
    {value: '2', viewValue: ' Active Reservations'},
    {value: '3', viewValue: ' Expired/Cancelled'},
    {value: '4', viewValue: ' Previous Financial Year'},
    {value: '5', viewValue: ' Current Financial Year'}
  ];
  selectedCategory = '1';
  public stDatePicker: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
    showTodayBtn: false,
    showClearDateBtn: false,
    width: '88%',
    selectorHeight: '225px',
    selectorWidth: '280px'
  };
  public stDt: any;
  public endDt: any;
  // Initialized to specific date (09.10.2018).
  // public stDt: any = { date: { year: 2018, month: 10, day: 9 } };
  // stDt = formatDate(this.today, 'dd/MM/yyyy', 'en-US', '+0530');

  public endDatePicker: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
    showTodayBtn: false,
    showClearDateBtn: false,
    width: '88%',
    selectorHeight: '225px',
    selectorWidth: '280px'
  };
  constructor(private myReportService: MyReportService, private router: Router, public dialog: MatDialog, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      'category': [null, Validators.required],
      'stDt': [null, Validators.required],
      'endDt': [null, Validators.required],
    });
    // this.stDt = formatDate(this.today, 'dd/MM/yyyy', 'en-US', '+0530');

  }

  ngOnInit() {
    this.getMyReport();
    this.setDate();
    console.log(this.startDate);
  }

  getMyReport() {
    this.myReportService.getMyReports(this.prdctDetId, this.userId, this.blockType, this.startDate, this.endDate)
      .subscribe(response => {
        this.restItems = response;
        if (this.restItems) {
          if (this.restItems.status == 'SUCCESS') {
            this.dataSource = new MatTableDataSource(this.restItems.result);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        }
      });
  }

  showDetails(row: any): void {
    const dialogRef = this.dialog.open(MyReportDialogComponent, {
      data: row, panelClass: 'myReport-dialog-container'
    });
  }

  filter() {
    this.blockType = this.selectedCategory;
    const startDt = this.filterForm.value.stDt.date;
    const endDt = this.filterForm.value.endDt.date;
    this.startDate = startDt.day + '/' + startDt.month + '/' + startDt.year;
    this.endDate = endDt.day + '/' + endDt.month + '/' + endDt.year;
    this.getMyReport();
  }

  setDate(): void {
    // Set today date using the patchValue function
    let date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    this.stDt = { date: { year: year, month: month, day: day } };
    this.endDt = { date: { year: year, month: month + 6, day: day } };
  }


  ExportTOExcel() {
    this.currentDate = formatDate(this.today, 'dd-MM-yyyy', 'en-US', '+0530');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tables.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    this.currentDate = this.currentDate + ' - Business-report.xlsx';
    XLSX.writeFile(wb, this.currentDate);
  }
}

@Component({
  selector: 'app-my-report-dialog',
  templateUrl: 'my-report-dialog.component.html',
  styleUrls: ['./my-report.component.scss']
})
export class MyReportDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MyReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MyReport) {
    console.log(this.data);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
