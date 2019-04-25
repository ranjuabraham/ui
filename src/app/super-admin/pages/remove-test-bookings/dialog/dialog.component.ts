import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {RemoveTestBookingsService} from '../remove-test-bookings.service';
import {NotificationService} from '../../../shared/notification';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  res: any;
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
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
  delete(prdctDetId) {
    const url = `${'/ema/admin/clear-block'}/${prdctDetId}`;
    this.http.get(url, {responseType: 'text'}).subscribe(res => {
      this.data = res;
      this.dialogRef.close();
      this.notificationService.onSuccess(this.data);
    });
  }
  goBack() {
    this.dialogRef.close();
    this.router.navigate(['/admin/remove-test-bookings/show']);
  }

}
