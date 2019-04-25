import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {BookingService} from '../booking.service';
import {Booking} from '../booking';

@Component({
  selector: 'app-historical-reservations',
  templateUrl: './historical-reservations.component.html',
  styleUrls: ['./historical-reservations.component.scss']
})
export class HistoricalReservationsComponent implements OnInit {
  displayedColumns: string[] = ['bookedOn', 'muhurtDts', 'endDt', 'evtName',
    'durName', 'fdTypName', 'dcdeHdr', 'status', 'paidStatus', 'links'];
  dataSource: MatTableDataSource<Booking>;
  restItems: any;
  public userInfo = JSON.parse(localStorage.getItem('userInfo'));
  count: any;

  constructor(private bookingService: BookingService) {
  }

  ngOnInit() {
    this.bookingService.getHistoricalBooking('0', this.userInfo.usrId, this.userInfo.usrTypeId, '4', '0')
      .subscribe(
        restItems => {
          this.restItems = restItems;
          this.dataSource = new MatTableDataSource(restItems.list);
          this.count = this.restItems.count;
        }
      );
  }

}
