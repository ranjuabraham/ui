import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SearchDetails} from '../search-details';
import {SearchDetailsService} from '../search-details.service';

@Component({
  selector: 'app-search-details-show',
  templateUrl: './search-details-show.component.html',
  styleUrls: ['./search-details-show.component.scss']
})
export class SearchDetailsShowComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'searchDetDesc', 'searchDesc', 'sequence', 'status', 'action'];
  dataSource: MatTableDataSource<SearchDetails>;
  restItems: SearchDetails[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private searchDetailsService: SearchDetailsService) {
  }

  ngOnInit() {this.searchDetailsService.getSearchDetails()
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
