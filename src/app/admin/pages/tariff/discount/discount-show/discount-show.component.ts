import { Component, OnInit, ViewChild} from '@angular/core';
import { Router} from '@angular/router';
import 'rxjs/add/observable/of';
import { DiscountService } from '../discount.service';
import { Discount} from '../discount';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-discount-show',
  templateUrl: './discount-show.component.html',
  styleUrls: ['./discount-show.component.scss']
})

export class DiscountShowComponent implements OnInit {

  public userInfo = JSON.parse(localStorage.getItem('userInfo'));
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public action = 'load';
  public resultInfo: Discount;
  displayedColumns: string[] = ['dcdeHdr', 'disAmount', 'discMuhurt', 'blkEdDt', 'discAct', 'action'];
  dataSource: MatTableDataSource<Discount>;
  restItems: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private discountService: DiscountService, private router: Router) { }

  ngOnInit() {  
    this.discountService.loadItems(this.prdctDetId)
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
    this.router.navigate(['/venue/discount/create']);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}



