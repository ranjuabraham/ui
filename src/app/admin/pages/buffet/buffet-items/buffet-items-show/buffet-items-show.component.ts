import { Component, OnInit, ViewChild} from '@angular/core';
import { Router} from '@angular/router';
import 'rxjs/add/observable/of';
import { BuffetItemsService } from '../buffet-items.service';
import { BuffetItems} from '../buffet-items';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-buffet-items-show',
  templateUrl: './buffet-items-show.component.html',
  styleUrls: ['./buffet-items-show.component.scss']
})
export class BuffetItemsShowComponent implements OnInit {

  public userInfo = JSON.parse(localStorage.getItem('userInfo'));
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public action = 'load';
  public resultInfo: BuffetItems;
  displayedColumns: string[] = ['buffCatg', 'buffSubHdr', 'fdDesc', 'fdDescSeq', 'fdDescAct', 'action'];
  dataSource: MatTableDataSource<BuffetItems>;
  restItems: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private buffetItemsService: BuffetItemsService, private router: Router) { }

  ngOnInit() { 
    this.buffetItemsService.loadItems(this.prdctDetId)
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

  loadCreatePage(){
    this.router.navigate(['/venue/buffet-category/create']);
  }

}

