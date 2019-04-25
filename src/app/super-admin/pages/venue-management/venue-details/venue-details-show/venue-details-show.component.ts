import {Component, OnInit, ViewChild} from '@angular/core';
import 'rxjs/add/observable/of';
import {MatPaginator, MatSort, MatDialog, MatTableDataSource} from '@angular/material';

import {VenueDetailsService} from '../venue-details.service';
import {VenueDetails} from '../venue-details';
import {sequence} from '@angular/animations';
import {VenueDetailsDialogComponent} from '../venue-details-dialog/venue-details-dialog.component';

@Component({
  selector: 'app-venue-details-show',
  templateUrl: './venue-details-show.component.html',
  styleUrls: ['./venue-details-show.component.scss']
})
export class VenueDetailsShowComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'prdctDetDesc', 'prdctDesc',
    'isListed', 'sequence', 'validity', 'status', 'action'];
  dataSource: MatTableDataSource<VenueDetails>;
  restItems: VenueDetails[];
  index: number;
  prdctDetId: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private venueDetailsService: VenueDetailsService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.venueDetailsService.getVenueDetails()
      .subscribe(
        restItems => {
          this.restItems = restItems;
          this.dataSource = new MatTableDataSource(restItems);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          // console.log(this.restItems);
        }
      );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  singleVenueDetails(
    prdctDetId: number,
    prdctDesc: string,
    prdctDetDesc: string,
    prdctIsListed: number,
    prdctIsDet: number,
    prdctIsWeb: number,
    prdctWebURL: string,
    prdctSeq: number,
    prdctStDt: string,
    prdctEdDt: string,
    prdctDetAct: number,
    prdctRefPct: number,
    alwBookType: number
  ) {
    this.prdctDetId = prdctDetId;
    // console.log(this.index);
    const dialogRef = this.dialog.open(VenueDetailsDialogComponent, {
      data: {
        prdctDetId: prdctDetId,
        prdctDesc: prdctDesc,
        prdctDetDesc: prdctDetDesc,
        prdctIsListed: prdctIsListed,
        prdctIsDet: prdctIsDet,
        prdctIsWeb: prdctIsWeb,
        prdctWebURL: prdctWebURL,
        prdctSeq: prdctSeq,
        prdctStDt: prdctStDt,
        prdctEdDt: prdctEdDt,
        prdctDetAct: prdctDetAct,
        prdctRefPct: prdctRefPct,
        alwBookType: alwBookType
      }
    });
  }
}
