import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/observable/of';
import {AboutUsService} from '../about-us.service';
import {AboutUs} from '../about-us';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-about-us-show',
  templateUrl: './about-us-show.component.html',
  styleUrls: ['./about-us-show.component.scss']
})

export class AboutUsShowComponent implements OnInit {
  public userInfo = JSON.parse(localStorage.getItem('userInfo'));
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public action = 'load';
  public aboutInfo: AboutUs;
  displayedColumns: string[] = ['abtUsHdr', 'abtUsDet', 'abtUsSeq', 'abtUsAct', 'action'];
  dataSource: MatTableDataSource<AboutUs>;
  restItems: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private aboutUsService: AboutUsService, private router: Router) {
  }

  ngOnInit() {
    this.aboutUsService.loadAboutUs(this.prdctDetId, this.userId, this.action)
      .subscribe(
        response => {
          this.restItems = response;
          if (this.restItems.status === 'SUCCESS') {
            this.dataSource = new MatTableDataSource(this.restItems.result);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          } else {
            this.loadCreatePage();
          }
        }
      );
  }

  loadCreatePage() {
    this.router.navigate(['/venue/about-us/create']);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  readMore(abtUsId: number) {
    const dots = document.getElementById('dots' + abtUsId);
    const moreText = document.getElementById('less' + abtUsId);
    const btnText = document.getElementById('moreBtn' + abtUsId);
    if (dots.style.display === 'none') {
      dots.style.display = 'inline';
      btnText.innerHTML = '... Read more';
      moreText.style.display = 'none';
    } else {
      dots.style.display = 'none';
      btnText.innerHTML = ' Read less';
      moreText.style.display = 'inline';
    }
  }
}
