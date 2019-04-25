import { Component, OnInit, ViewChild} from '@angular/core';
import { Router} from '@angular/router';
import 'rxjs/add/observable/of';
import { DecodeMasterService } from '../decode-master.service';
import { DecodeMaster } from '../decode-master';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource} from '@angular/material';
import { callNgModuleLifecycle } from '@angular/core/src/view/ng_module';


@Component({
  selector: 'app-decode-show',
  templateUrl: './decode-show.component.html',
  styleUrls: ['./decode-show.component.scss']
})

export class DecodeShowComponent implements OnInit {

  public userInfo = JSON.parse(localStorage.getItem('userInfo'));
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public action = 'load';
  displayedColumns: string[] = ['dcdeTypeDet','dcdeHdr', 'dcdeDet','dcdeSeq', 'dcdeAct', 'action'];
  dataSource: MatTableDataSource<DecodeMaster>;
  restItems:  any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private decodeService: DecodeMasterService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.decodeService.loadItems(this.prdctDetId)
    .subscribe(
      response => {
        this.restItems = response;
        if(this.restItems.status == 'SUCCESS'){
          this.dataSource = new MatTableDataSource(this.restItems.result);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        else{
          this.loadCreatePage();
        }
      });
  }

  loadCreatePage(){
    this.router.navigate(['/venue/decode/create']);
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
    offerAct: string){
      // this.prdctDetId = prdctDetId;
      //  const dialogRef = this.dialog.open(PromotionDialogComponent, {
      // data: {
      // prdctDetId: prdctDetId,
      // offerId: offerId,
      // offerHdr: offerHdr,
      // offerShort: offerShort,
      // offerDet: offerDet,
      // offerSeq: offerSeq,
      // offerAct: offerAct
      // }
      // });
    }
}
