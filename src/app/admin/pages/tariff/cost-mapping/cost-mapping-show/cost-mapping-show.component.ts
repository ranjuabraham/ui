import { Component, OnInit, ViewChild} from '@angular/core';
import { Router} from '@angular/router';
import 'rxjs/add/observable/of';
import { CostMappingService } from '../cost-mapping.service';
import { CostMapping} from '../cost-mapping';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource} from '@angular/material';
import { CostMappingDialogComponent} from '../cost-mapping-dialog/cost-mapping-dialog.component';

@Component({
  selector: 'app-cost-mapping-show',
  templateUrl: './cost-mapping-show.component.html',
  styleUrls: ['./cost-mapping-show.component.scss']
})
export class CostMappingShowComponent implements OnInit {

  public userInfo = JSON.parse(localStorage.getItem('userInfo'));
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public action = 'load';
  public resultInfo: CostMapping;
  displayedColumns: string[] = ['dcdeHdr', 'evtHdr', 'durHdr', 'fdTypHdr', 'action'];
  dataSource: MatTableDataSource<CostMapping>;
  restItems: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private costMapService: CostMappingService, private router: Router, public dialog: MatDialog) { }
  
  ngOnInit() {
    this.costMapService.loadItems(this.prdctDetId)
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

  loadCreatePage(){
    this.router.navigate(['/venue/cost-map/create']);
  }

  showDetails(
    prdctDetId: number,
    valId: number,
    dcdeHdr: number,
    evtHdr: number,
    durHdr: number,
    fdTypHdr: number,
    rentVal: number,
    servChrg: number,
    miscChrg: number,
    muhurtChrg: number
    ){
    this.prdctDetId = prdctDetId;
    const dialogRef = this.dialog.open(CostMappingDialogComponent, {
      data: {
      prdctDetId: prdctDetId,
      valId: valId,
      dcdeHdr: dcdeHdr,
      evtHdr: evtHdr,
      durHdr: durHdr,
      fdTypHdr: fdTypHdr,
      rentVal: rentVal,
      servChrg: servChrg,
      miscChrg: miscChrg,
      muhurtChrg: muhurtChrg
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
