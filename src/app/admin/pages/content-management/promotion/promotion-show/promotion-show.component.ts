import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/observable/of';
import {PromotionService} from '../promotion.service';
import {Promotion} from '../promotion';
import {MatPaginator, MatSort, MatDialog, MatTableDataSource} from '@angular/material';
import {PromotionDialogComponent} from '../promotion-dialog/promotion-dialog.component';

@Component({
  selector: 'app-promotion-show',
  templateUrl: './promotion-show.component.html',
  styleUrls: ['./promotion-show.component.scss']
})

export class PromotionShowComponent implements OnInit {
  public userInfo = JSON.parse(localStorage.getItem('userInfo'));
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public action = 'load';
  displayedColumns: string[] = ['offerHdr', 'offerShort', 'offerTyp', 'offerSeq', 'offerAct', 'action'];
  dataSource: MatTableDataSource<Promotion>;
  restItems: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private amenitiesService: PromotionService, private router: Router, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.amenitiesService.loadItems(this.prdctDetId)
      .subscribe(
        response => {
          this.restItems = response;
          if (this.restItems.status === 'SUCCESS') {
            this.dataSource = new MatTableDataSource(this.restItems.result);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          } else {
            this.loadCreatePage();
          }
        });
  }

  loadCreatePage() {
    this.router.navigate(['/venue/promotion/create']);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showDetails(
    prdctDetId: number,
    offerId: number,
    offerHdr: string,
    offerShort: string,
    offerDet: string,
    offerSeq: string,
    offerAct: string) {
    this.prdctDetId = prdctDetId;
    const dialogRef = this.dialog.open(PromotionDialogComponent, {
      data: {
        prdctDetId: prdctDetId,
        offerId: offerId,
        offerHdr: offerHdr,
        offerShort: offerShort,
        offerDet: offerDet,
        offerSeq: offerSeq,
        offerAct: offerAct
      },
      panelClass: 'promotion-dialog-container'
    });
  }

}
