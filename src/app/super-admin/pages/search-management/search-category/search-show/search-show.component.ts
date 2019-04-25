import {Component, OnInit, ViewChild} from '@angular/core';
import {SearchCategoryService} from '../search-category.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SearchCategory} from '../search-category';
@Component({
  selector: 'app-search-show',
  templateUrl: './search-show.component.html',
  styleUrls: ['./search-show.component.scss']
})
export class SearchShowComponent implements OnInit {
  displayedColumns: string[] = ['categoryId', 'searchDesc', 'categorySequence', 'categoryState', 'action'];
  dataSource: MatTableDataSource<SearchCategory>;
  restItems: SearchCategory[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private searchCategoryService: SearchCategoryService) {
  }

  ngOnInit() {this.searchCategoryService.getSearchCategory()
    .subscribe(
      restItems => {
        this.restItems = restItems;
        this.dataSource = new MatTableDataSource(restItems);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

