import { Component, OnInit, ViewChild} from '@angular/core';
import { Router} from '@angular/router';
import 'rxjs/add/observable/of';
import { DurationService } from '../duration.service';
import { Duration} from '../duration';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource} from '@angular/material';
import { DurationDialogComponent} from '../duration-dialog/duration-dialog.component';

@Component({
  selector: 'app-duration-show',
  templateUrl: './duration-show.component.html',
  styleUrls: ['./duration-show.component.scss']
})
export class DurationShowComponent implements OnInit {
  public userInfo = JSON.parse(localStorage.getItem('userInfo'));
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public action = 'load';
  public resultInfo: Duration;
  displayedColumns: string[] = ['evtId', 'durHdr', 'durMul', 'time', 'durAct', 'action'];
  dataSource: MatTableDataSource<Duration>;
  restItems: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private durationService: DurationService, private router: Router,  public dialog: MatDialog) { }

  ngOnInit() { 
    
    this.durationService.loadItems(this.prdctDetId)
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
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showDetails(
    prdctDetId: number,
    evtId: number,
    durId: number,
    durName: string,
    durSeq: number,
    durAct: number,
    durMul: number,
    adnlDurFlg: number,
    durStm: string,
    durEtm: string,
    durSDay:number,
    durEDay: number,
    durDtm: number){
      this.prdctDetId = prdctDetId;
      console.log('');
      console.log(durStm);
      const dialogRef = this.dialog.open(DurationDialogComponent, {
      data: {
        prdctDetId: prdctDetId,
        evtId: evtId,
        durId: durId,
        durName: durName,
        durSeq: durSeq,
        durAct: durAct,
        durMul: durMul,
        adnlDurFlg: adnlDurFlg,
        durStm: durStm,
        durEtm: durEtm,
        durSDay: durSDay,
        durEDay: durEDay,
        durDtm: durDtm
      },
        panelClass: 'duration-dialog-container'
      });
  }

  loadCreatePage(){
    this.router.navigate(['/venue/duration/create']);
  }

}

