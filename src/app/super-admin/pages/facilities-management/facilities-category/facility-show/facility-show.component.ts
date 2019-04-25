import {Component, OnInit, ViewChild} from '@angular/core';
import {FacilityCategory} from '../facility-category';
import {FacilityCategoryService} from '../facility-category.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-search-show',
  templateUrl: './facility-show.component.html',
  styleUrls: ['./facility-show.component.scss']
})
export class FacilityShowComponent implements OnInit {
  loading: boolean;
  error: string;
  displayedColumns: string[] = ['categoryId', 'facSupHdr', 'categoryState', 'action'];
  dataSource: MatTableDataSource<FacilityCategory>;
  restItems: FacilityCategory[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private facilityCategoryService: FacilityCategoryService) {
  }

  ngOnInit() {
    this.facilityCategoryService.getFacilityCategory()
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
