import { Component, OnInit, ViewChild} from '@angular/core';
import { Router} from '@angular/router';
import 'rxjs/add/observable/of';
import { HourlyTariffService } from '../hourly-tariff.service';
import { HourlyTariff} from '../hourly-tariff';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';



@Component({
  selector: 'app-hourly-tariff-show',
  templateUrl: './hourly-tariff-show.component.html',
  styleUrls: ['./hourly-tariff-show.component.scss']
})
export class HourlyTariffShowComponent implements OnInit {

  public userInfo = JSON.parse(localStorage.getItem('userInfo'));
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public action = 'load';
  public resultInfo: HourlyTariff;
  displayedColumns: string[] = ['dcdeHdr', 'adnlDurTar', 'adnlDurAct', 'action'];
  dataSource: MatTableDataSource<HourlyTariff>;
  restItems: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private hourlyService: HourlyTariffService, private router: Router) { }

  ngOnInit() {  
    this.hourlyService.loadItems(this.prdctDetId)
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
    this.router.navigate(['/venue/hourly-cost/create']);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}



