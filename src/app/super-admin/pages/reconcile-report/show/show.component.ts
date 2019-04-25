import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../../shared/notification';
import {ReconcileReportService} from '../reconcile-report.service';
import {DialogReconcileReportComponent} from '../dialog-reconcile-report/dialog-reconcile-report.component';
import {ReconcileReport} from '../reconcile-report';
import {FormControl} from '@angular/forms';
import * as XLSX from 'xlsx';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  loading: boolean;
  error: string;
  index: number;
  displayedColumns = ['sno', 'bookedOn', 'rptPrdctDetDesc',
    'totalAmount', 'venueShare', 'hdShare', 'citrusShare', 'hdReConAmount', 'action'];
  dataSource: MatTableDataSource<ReconcileReport>;
  restItems: ReconcileReport[];
  totall: any;
  countt: number;
  citruss: any;
  reconcile: any;
  webb: any;
  venuee: any;
  selected: any;
  today = new Date();
  currentDate = '';

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('TABLES') tables: ElementRef;
  message = '';
  public form: FormGroup;
  submitted = false;

  venueName: ReconcileReport[] = [];
  rptTransactionId: number;
  public data: any;

  constructor(
    private reconcileReportService: ReconcileReportService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    public dialog: MatDialog
  ) {
    // To initialize FormGroup
    this.form = fb.group({
      'rptPrdctStDt': [new Date()],
      'rptPrdctEdDt': [null],
      'rptPrdctDetId': [null],
    });
    this.currentDate = formatDate(this.today, 'dd-MM-yyyy', 'en-US', '+0530');
  }

  ngOnInit() {
    this.getVenueCategoryId();
    this.selected = '0';
  }

  /** GET: Venue Name get from database **/
  getVenueCategoryId() {
    this.reconcileReportService.getVenueName()
      .subscribe(vName => {
        this.venueName = vName;
      });
  }

  ///// Save Method //////
  /** POST: add a new venue details to the database **/
  filterReport() {
    this.submitted = true;
    // // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    // console.warn(this.venueCategoryForm.value);
    this.loading = true;

    this.reconcileReportService
      .reconcileReport(this.form.value)
      .subscribe(res => {
        this.data = res;
        if (!this.data) {
          return;
        }
        console.log(this.data);
        this.countt = this.data.countt;
        this.citruss = this.data.citruss;
        this.webb = this.data.webb;
        this.totall = this.data.totall;
        this.reconcile = this.data.reconcile;
        this.venuee = this.data.venuee;
        this.dataSource = new MatTableDataSource(this.data.list);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // this.data.list.map(d => d.length === 0).startWith(false);
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
    rptPrdctId: number,
    bookedOn: string,
    rptPrdctDetId: number,
    rptPrdctDetDesc: string,
    userName: string,
    evtName: string,
    rptTotalAmount: number,
    rptPrdctWebShare: number,
    rptPrdctOwnerShare: number,
    rptPrdctCitrusShare: number,
    reconcileAmount: number,
    rptTransactionId: number,
  ) {
    this.rptTransactionId = rptTransactionId;
    // console.log(this.index);
    const dialogRef = this.dialog.open(DialogReconcileReportComponent, {
      data: {
        rptPrdctId: rptPrdctId,
        bookedOn: bookedOn,
        rptPrdctDetId: rptPrdctDetId,
        rptPrdctDetDesc: rptPrdctDetDesc,
        userName: userName,
        evtName: evtName,
        rptTotalAmount: rptTotalAmount,
        rptPrdctWebShare: rptPrdctWebShare,
        rptPrdctOwnerShare: rptPrdctOwnerShare,
        rptPrdctCitrusShare: rptPrdctCitrusShare,
        reconcileAmount: reconcileAmount,
      }
    });
  }

  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tables.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    this.currentDate = this.currentDate + ' - Reconcile-report.xlsx';
    XLSX.writeFile(wb, this.currentDate);
  }
}
