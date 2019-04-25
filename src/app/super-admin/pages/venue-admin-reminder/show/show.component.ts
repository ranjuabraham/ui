import {Component, OnInit, ViewChild} from '@angular/core';
import 'rxjs/add/observable/of';
import {MatPaginator, MatSort, MatDialog, MatTableDataSource} from '@angular/material';
import {VenueAdminReminder} from '../venue-admin-reminder';
import {VenueAdminReminderService} from '../venue-admin-reminder.service';
import {DialogComponent} from '../../remove-test-bookings/dialog/dialog.component';
import {SendSmsDialogComponent} from '../send-sms-dialog/send-sms-dialog.component';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'prdctDetDesc', 'bookDate',
    'eventDate', 'status', 'action'];
  dataSource: MatTableDataSource<VenueAdminReminder>;
  restItems: VenueAdminReminder[];
  prdctDetId: number;
  index: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private venueAdminRemainderService: VenueAdminReminderService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.venueAdminRemainderService.getVenueAdminRemainder()
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
            txnId: number
  ) {
    this.prdctDetId = prdctDetId;
    const dialogRef = this.dialog.open(SendSmsDialogComponent, {
      disableClose: true,
      data: {
        prdctDetId: prdctDetId,
        txnId: txnId,
      }
    });
  }
}
