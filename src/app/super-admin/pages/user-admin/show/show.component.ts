import { Component, OnInit, ViewChild } from '@angular/core';
import 'rxjs/add/observable/of';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UserAdmin} from '../user-admin';
import {UserAdminService} from '../user-admin.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  displayedColumns: string[] = ['sno', 'emailId', 'usrType', 'prdctDetDesc', 'action'];
  dataSource: MatTableDataSource<UserAdmin>;
  restItems: UserAdmin[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userAdminService: UserAdminService) {
  }

  ngOnInit() {
    this.userAdminService.getUserAdmin()
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
