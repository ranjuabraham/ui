import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reserve-dialog',
  templateUrl: './reserve-dialog.component.html',
  styleUrls: ['./reserve-dialog.component.scss']
})
export class ReserveDialogComponent {

  constructor(
    public router: Router,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ReserveDialogComponent>) {
  }

  close(): void {
    this.dialogRef.close();
  }

  continueToBook() {
    this.http.post('/ema/venue/update-book', this.data).subscribe(res => {
      console.log(res);
      if (res['status'] === 'SUCCESS') {
        const bookingId = res['transaction'];
        const productDetId = res['prdctDetId'];
        this.router.navigate(['checkout/approval-request'],
          {
            queryParams: {
              bookingId: res['transaction']
            }
          });
        this.dialogRef.close();
      } else {
        alert('Oops..., Something went wrong!');
      }
    });
  }
}
