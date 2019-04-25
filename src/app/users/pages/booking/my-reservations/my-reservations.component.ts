import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {BookingService} from '../booking.service';
import {Booking} from '../booking';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.scss']
})
export class MyReservationsComponent implements OnInit {

  displayedColumns: string[] = ['bookedOn', 'muhurtDts', 'endDt', 'evtName',
    'durName', 'fdTypName', 'dcdeHdr', 'status', 'paidStatus', 'links'];
  dataSource: MatTableDataSource<Booking>;
  restItems: any;
  public userInfo = JSON.parse(localStorage.getItem('userInfo'));
  count: any;

  constructor(private bookingService: BookingService,
              public router: Router,
              private route: ActivatedRoute,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.bookingService.getHistoricalBooking('0', this.userInfo.usrId, this.userInfo.usrTypeId, '2', '0')
      .subscribe(
        restItems => {
          this.restItems = restItems;
          this.dataSource = new MatTableDataSource(restItems.list);
          this.count = this.restItems.count;
        }
      );
  }

  payNow(txnId: number, prdctDetId: number) {
    this.router.navigate(['/booking/pay-now'],
      {queryParams: {bookingId: txnId, prdctDetId: prdctDetId}});
  }

}
