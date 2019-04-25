import {Component, OnInit, Input, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.scss']
})
export class BookDialogComponent {
  constructor(
    public router: Router,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<BookDialogComponent>) {
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
