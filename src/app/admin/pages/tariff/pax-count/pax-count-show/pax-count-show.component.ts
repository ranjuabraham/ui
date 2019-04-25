import { Component, OnInit, ViewChild} from '@angular/core';
import { Router} from '@angular/router';
import 'rxjs/add/observable/of';
import { PaxCountService } from '../pax-count.service';
import { PaxCount} from '../pax-count';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-pax-count-show',
  templateUrl: './pax-count-show.component.html',
  styleUrls: ['./pax-count-show.component.scss']
})

export class PaxCountShowComponent implements OnInit {

  public userInfo = JSON.parse(localStorage.getItem('userInfo'));
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public action = 'load';
  public resultInfo: PaxCount;
  displayedColumns: string[] = ['dcdeHdr', 'buffCount', 'buffMax', 'action'];
  dataSource: MatTableDataSource<PaxCount>;
  restItems: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private hourlyService: PaxCountService, private router: Router) { }

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
    this.router.navigate(['/venue/pax-count/create']);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}



