import { Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/observable/of';
import { SearchService } from '../search.service';
import { Search } from '../search';
import {MatPaginator, MatSort, MatDialog, MatTableDataSource} from '@angular/material';
//import { callNgModuleLifecycle } from '@angular/core/src/view/ng_module';
//import { PromotionDialogComponent} from '../promotion-dialog/promotion-dialog.component';

@Component({
  selector: 'app-search-show',
  templateUrl: './search-show.component.html',
  styleUrls: ['./search-show.component.scss']
})
export class SearchShowComponent implements OnInit {

  public userInfo = JSON.parse(localStorage.getItem('userInfo'));
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public action = 'load';
  displayedColumns: string[] = ['searchDesc', 'searchDetDesc', 'searchDetMap','action'];
  dataSource: MatTableDataSource<Search>;
  restItems: any;
  count: number;
  size: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private searchService: SearchService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.searchService.loadItems(this.prdctDetId)
    .subscribe(
      response => {
        this.restItems = response;
        if(this.restItems.status == 'SUCCESS'){
          this.count = this.restItems.count;
          this.size = this.restItems.result.length;
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
    this.router.navigate(['/venue/search/create']);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}
