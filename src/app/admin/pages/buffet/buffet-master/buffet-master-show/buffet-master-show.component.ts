import { Component, OnInit, ViewChild} from '@angular/core';
import { Router} from '@angular/router';
import 'rxjs/add/observable/of';
import { BuffetMasterService } from '../buffet-master.service';
import { BuffetMaster} from '../buffet-master';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource} from '@angular/material';
import { BuffetMasterDialogComponent} from '../buffet-master-dialog/buffet-master-dialog.component';
@Component({
  selector: 'app-buffet-master-show',
  templateUrl: './buffet-master-show.component.html',
  styleUrls: ['./buffet-master-show.component.scss']
})
export class BuffetMasterShowComponent implements OnInit {

  public userInfo = JSON.parse(localStorage.getItem('userInfo'));
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public action = 'load';
  public resultInfo: BuffetMaster;
  displayedColumns: string[] = ['buffCatg', 'buffDesc', 'alwToChoose', 'buffAct', 'action'];
  dataSource: MatTableDataSource<BuffetMaster>;
  restItems: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private buffetMasterService: BuffetMasterService, private router: Router,  public dialog: MatDialog) { }

  ngOnInit() { 
    this.buffetMasterService.loadItems(this.prdctDetId)
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
    this.router.navigate(['/venue/buffet-master/create']);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showDetails(
    prdctDetId: number,
    fdTypId: number,
    buffId: number,
    buffCatg: string,
    buffDesc: string,
    buffComp: string,
    buffCost: number,
    buffTax: number,
    discVal: number,
    reserVal: number,
    leafCost: number){
      this.prdctDetId = prdctDetId;
      const dialogRef = this.dialog.open(BuffetMasterDialogComponent, {
      data: {
        prdctDetId: prdctDetId,
        fdTypId: fdTypId,
        buffId: buffId,
        buffCatg: buffCatg,
        buffDesc: buffDesc,
        buffComp: buffComp,
        buffCost: buffCost,
        buffTax: buffTax,
        discVal: discVal,
        reserVal: reserVal,
        leafCost: leafCost
      },
        panelClass: 'buffet-master-dialog-container'
      });
    
    }

}
