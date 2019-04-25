import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {VenueDetails} from '../../venue-management/venue-details/venue-details';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../../shared/notification';
import {Report} from '../report';
import {ReportService} from '../report.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DialogReportComponent} from '../dialog-report/dialog-report.component';
import * as XLSX from 'xlsx';
import {formatDate } from '@angular/common';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  loading: boolean;
  error: string;
  index: number;
  displayedColumns = ['sno', 'rptPrdctDetDesc', 'bookedOn', 'date',
    'bookReserve', 'totalAmount',
    'hdShare', 'OwnerShare', 'citrusShare', 'action'];
  dataSource: MatTableDataSource<Report>;
  restItems: Report[];
  total: any;
  count: any;
  citrus: any;
  web: any;
  venue: any;
  today = new Date();
  currentDate = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('TABLES') tables: ElementRef;
  message = '';
  public form: FormGroup;
  submitted = false;
  venueType: Report[] = [];
  venueName: Report[] = [];
  rptTransactionId: number;
  public data: any;

  constructor(
    private reportService: ReportService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    public dialog: MatDialog
  ) {
    // To initialize FormGroup
    this.form = fb.group({
      'rptPrdctId': [null, Validators.required],
      'rptPrdctDetId': [null, Validators.required],
      'rptPrdctStDt': [null],
      'rptPrdctEdDt': [null],
    });

    this.currentDate = formatDate(this.today, 'dd-MM-yyyy', 'en-US', '+0530');
  }

  ngOnInit() {
    this.getVenueType();
  }

  // Venue Type from server
  getVenueType() {
    this.reportService.getVenueType()
      .subscribe(type => {
        this.venueType = type;
      });
  }

  getVenueCategoryId(rptPrdctId) {
    console.log(rptPrdctId);
    this.reportService.getVenueCategoryId(rptPrdctId)
      .subscribe(vName => {
        this.venueName = vName;
      });
  }

  /** POST: add a new venue details to the database **/
  filterReport() {
    this.submitted = true;
    // // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.reportService
      .filterReport(this.form.value)
      .subscribe(res => {
        this.data = res;
        if (!this.data) {
          return;
        }
        this.count = this.data.count;
        this.citrus = this.data.citrus;
        this.web = this.data.web;
        this.total = this.data.total;
        this.venue = this.data.venue;
        this.dataSource = new MatTableDataSource(this.data.list);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
          this.loading = false;
        },
        error => {
          this.notificationService.onError('Oops! Something went wrong.');
          this.error = error;
          this.loading = false;
        });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  singleReport(
    rptPrdctDetDesc: string,
    bookedOn: string,
    rptPrdctStDt: string,
    rptPrdctEdDt: string,
    rptIsBlk: number,
    rptTransactionId: number,
    rptTransStatus: string,
    rptPgTransNo: string,
    rptTotalAmount: number,
    rptPrdctWebShare: number,
    rptPrdctOwnerShare: number,
    rptPrdctCitrusShare: number,
    bkTxnId: string,
    bkTxnStat: string,
    bkPgTxnNo: string,
  ) {
    this.rptTransactionId = rptTransactionId;
    // console.log(this.index);
    const dialogRef = this.dialog.open(DialogReportComponent, {
      data: {
        rptPrdctDetDesc: rptPrdctDetDesc,
        bookedOn: bookedOn,
        rptPrdctStDt: rptPrdctStDt,
        rptPrdctEdDt: rptPrdctEdDt,
        rptIsBlk: rptIsBlk,
        rptTransactionId: rptTransactionId,
        rptTransStatus: rptTransStatus,
        rptPgTransNo: rptPgTransNo,
        rptTotalAmount: rptTotalAmount,
        rptPrdctWebShare: rptPrdctWebShare,
        rptPrdctOwnerShare: rptPrdctOwnerShare,
        rptPrdctCitrusShare: rptPrdctCitrusShare,
        bkTxnId: bkTxnId,
        bkTxnStat: bkTxnStat,
        bkPgTxnNo: bkPgTxnNo,
      }
    });
  }

  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tables.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    this.currentDate = this.currentDate + ' - Business-report.xlsx';
    XLSX.writeFile(wb, this.currentDate);
  }
}
