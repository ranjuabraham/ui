import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import {ProcessReviews} from '../process-reviews';
import {ProcessReviewsService} from '../process-reviews.service';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../../shared/notification';
import {Router} from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  displayedColumns: string[] = ['sno', 'prdctName', 'rvwName', 'rvwTitle', 'review', 'absUserName',
    'reason', 'action'];
  dataSource: MatTableDataSource<ProcessReviews>;
  restItems: ProcessReviews[];
  yes = 'Y';
  no = 'N';
  status: boolean = false;
  hidden: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private processReviewsService: ProcessReviewsService,
    private http: HttpClient,
    private notificationService: NotificationService,
    private router: Router,
  ) {}
  ngOnInit() {
    this.processReviewsService.getProcessReviews()
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

  approve(rptId: number, yes: string) {
    this.status = !this.status;
    const url = `${'/ema/admin/process-review-update'}/${rptId}/${yes}`;
    this.http.get(url, {responseType: 'text'}).subscribe(res => {
      this.router.navigate(['/admin/process-reviews/show']);
      this.notificationService.onSuccess('Approved');
    });
  }
  reject(rptId: number, no: string) {
    const url = `{'ema/admin/process-review-update'}/${rptId}/${no}`;
    this.http.get(url, {responseType: 'text'}).subscribe(res => {
      this.router.navigate(['/admin/process-reviews/show']);
      this.notificationService.onSuccess('Rejected');
    });
  }
}
