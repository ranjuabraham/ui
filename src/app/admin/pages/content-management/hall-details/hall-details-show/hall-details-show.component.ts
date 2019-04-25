import { Component, OnInit, ViewChild} from '@angular/core';
import { Router} from '@angular/router';
import 'rxjs/add/observable/of';
import { HallDetailsService } from '../hall-details.service';
import { HallDetails } from '../hall-details';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource} from '@angular/material';
import {HallDetailsDialogComponent} from '../hall-details-dialog/hall-details-dialog.component';

@Component({
  selector: 'app-hall-details-show',
  templateUrl: './hall-details-show.component.html',
  styleUrls: ['./hall-details-show.component.scss']
})
export class HallDetailsShowComponent implements OnInit {

  public userInfo = JSON.parse(localStorage.getItem('userInfo'));
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public action = 'load';
  displayedColumns: string[] = ['hallName', 'idDefault', 'hourly', 'buffet', 'discount', 'status', 'action'];
  dataSource: MatTableDataSource<HallDetails>;
  restItems:  any;
  hourlyFlag: number = 0;
  buffetFlag: number = 0;
  discountFlag: number = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 
 
  constructor(private hallInfoService: HallDetailsService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.hallInfoService.loadItems(this.prdctDetId)
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
    this.router.navigate(['/venue/hall-details/create']);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showDetails(data: any) {
    const dialogRef = this.dialog.open(HallDetailsDialogComponent, {
      data: data,
      panelClass: 'hall-info-dialog-container'
    });
  }

}

