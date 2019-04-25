import { Component, OnInit, ViewChild} from '@angular/core';
import { Router} from '@angular/router';
import 'rxjs/add/observable/of';
import { FoodTypeService } from '../food-type.service';
import { FoodType} from '../food-type';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-food-type-show',
  templateUrl: './food-type-show.component.html',
  styleUrls: ['./food-type-show.component.scss']
})
export class FoodTypeShowComponent implements OnInit {

  public userInfo = JSON.parse(localStorage.getItem('userInfo'));
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public action = 'load';
  displayedColumns: string[] = ['fdTypHdr', 'fdTypSeq', 'fdTypAct', 'action'];
  dataSource: MatTableDataSource<FoodType>;
  restItems: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fdTypeService: FoodTypeService, private router: Router) { }

  ngOnInit(){
    this.fdTypeService.loadItems(this.prdctDetId)
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
    this.router.navigate(['/venue/events/create']);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}


