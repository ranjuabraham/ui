import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {RemoveTestBookingsService} from '../../remove-test-bookings/remove-test-bookings.service';
import {NotificationService} from '../../../shared/notification';

@Component({
  selector: 'app-send-sms-dialog',
  templateUrl: './send-sms-dialog.component.html',
  styleUrls: ['./send-sms-dialog.component.scss']
})
export class SendSmsDialogComponent implements OnInit {

  res: any;
  constructor(public dialogRef: MatDialogRef<SendSmsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router,
              private http: HttpClient,
              public dialog: MatDialog,
              private removeTestBookingService: RemoveTestBookingsService,
              private notificationService: NotificationService
  ) {
  }

  ngOnInit() {
  }
  /** DELETE: delete the Remove test Booking record from the server */
  sendSms(prdctDetId, txnId) {
    const url = `${'/ema/admin/admin-reminder'}/${prdctDetId}/${txnId}`;
    this.http.get(url, {responseType: 'text'}).subscribe(res => {
      this.data = res;
      this.dialogRef.close();
      this.notificationService.onSuccess(this.data);
    });
  }
  goBack() {
    this.dialogRef.close();
    this.router.navigate(['/admin/venue-admin-reminder/show']);
  }


}
