import {Component, OnInit, ViewChild} from '@angular/core';
import {VenueCategory} from '../venue-category';
import {VenueCategoryService} from '../venue-category.service';
import 'rxjs/add/observable/of';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-venue-show',
  templateUrl: './venue-show.component.html',
  styleUrls: ['./venue-show.component.scss']
})


export class VenueShowComponent implements OnInit {
  displayedColumns: string[] = ['categoryId', 'prdctDesc', 'categorySequence', 'categoryState', 'action'];
  dataSource: MatTableDataSource<VenueCategory>;
  restItems: VenueCategory[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private venueCategoryService: VenueCategoryService) {
  }

  ngOnInit() {
    this.venueCategoryService.getVenueCategory()
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
