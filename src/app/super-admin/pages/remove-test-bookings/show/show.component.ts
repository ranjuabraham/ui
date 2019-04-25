import {Component, OnInit, ViewChild} from '@angular/core';
import 'rxjs/add/observable/of';
import {MatPaginator, MatSort, MatDialog, MatTableDataSource} from '@angular/material';
import {sequence} from '@angular/animations';

import {RemoveTestBookingsService} from '../remove-test-bookings.service';
import {RemoveTestBookings} from '../remove-test-bookings';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'prdctDesc', 'prdctDetDesc',  'action'];
  dataSource: MatTableDataSource<RemoveTestBookings>;
  restItems: RemoveTestBookings[];
  index: number;
  prdctDetId: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private removeTestBookingService: RemoveTestBookingsService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.removeTestBookingService.getRemoveTestBooking()
      .subscribe(
        restItems => {
          this.restItems = restItems;
          this.dataSource = new MatTableDataSource(restItems);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  startEdit(prdctDetId: number,
            prdctDesc: string,
            prdctDetDesc: string,
  ) {
    this.prdctDetId = prdctDetId;
    const dialogRef = this.dialog.open(DialogComponent, { disableClose: true,
      data: {
        prdctDetId: prdctDetId,
        prdctDesc: prdctDesc,
        prdctDetDesc: prdctDetDesc,
      }
    });
  }
}
