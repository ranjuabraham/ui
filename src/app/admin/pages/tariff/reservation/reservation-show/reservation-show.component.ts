import { Component, OnInit, ViewChild} from '@angular/core';
import { Router} from '@angular/router';
import 'rxjs/add/observable/of';
import { ReservationService } from '../reservation.service';
import { Reservation} from '../reservation';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-reservation-show',
  templateUrl: './reservation-show.component.html',
  styleUrls: ['./reservation-show.component.scss']
})
export class ReservationShowComponent implements OnInit {

  public userInfo = JSON.parse(localStorage.getItem('userInfo'));
  public prdctDetId = JSON.parse(localStorage.getItem('userInfo')).prdctDetId;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  public action = 'load';
  //public tarType = 0;
  public resultInfo: Reservation;
  displayedColumns: string[] = ['bfwk', 'afwk', 'bfdy', 'resVal', 'action'];
  dataSource: MatTableDataSource<Reservation>;
  restItems: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private reservationService: ReservationService, private router: Router) { }

  ngOnInit() {  
    this.reservationService.loadItems(this.prdctDetId)
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
    this.router.navigate(['/venue/reservation/create']);
  }

}


