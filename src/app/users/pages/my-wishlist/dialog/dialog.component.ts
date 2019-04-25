import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../../../shared/notification';
import {MyWishlistService} from '../my-wishlist.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  res: any;
  wishlistData: any;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router,
              private http: HttpClient,
              public dialog: MatDialog,
              private notificationService: NotificationService,
              public myWishlistService: MyWishlistService,
  ) {
  }

  ngOnInit() {
  }
  /** DELETE: delete the my wishlist record from the server */
  delete(userId, prdctDetId) {
    const url = `${'/ema/login/remove-favourites'}/${userId}/${prdctDetId}`;
    this.http.get(url, {responseType: 'text'}).subscribe(res => {
      this.data = res;
      this.getMyWishlist();
      this.dialogRef.close();
      this.refresh();
      // this.notificationService.onSuccess(this.data);
    });
  }
  goBack() {
    this.dialogRef.close();
    this.router.navigate(['/my-wishlist']);
  }
  refresh(): void {
    window.location.reload();
  }
  getMyWishlist() {
    this.myWishlistService.getMyWishlist(this.userId)
      .subscribe(data => this.wishlistData = data);
    // console.log(this.wishlistData.list);
  }
}
