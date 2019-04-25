import {Component, OnInit} from '@angular/core';
import {MyWishlistService} from './my-wishlist.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogComponent} from './dialog/dialog.component';
import {trigger} from "@angular/animations";
import {fadeIn, fadeOut} from "../../@theme/utils/animations/fade-animations";
import {LoginDialogComponent} from "../login-dialog/login-dialog.component";
import {CheckAvailabilityDialogComponent} from "./check-availability-dialog/check-availability-dialog.component";
import {AppService} from "../../../app.service";


@Component({
  selector: 'app-my-wishlist',
  templateUrl: './my-wishlist.component.html',
  styleUrls: ['./my-wishlist.component.scss'],
  animations: [
    trigger('fadeOut', fadeOut()),
    trigger('fadeIn', fadeIn(':enter'))
  ],
})
export class MyWishlistComponent implements OnInit {
  count: any;
  list: any;
  prdctDetId: number;
  public data: any;
  public userId = JSON.parse(localStorage.getItem('userInfo')).usrId;
  wishlistData: any;

  constructor(public myWishlistService: MyWishlistService,
              private router: Router,
              private appService: AppService,
              private http: HttpClient, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getMyWishlist();
  }

  getMyWishlist() {
    this.myWishlistService.getMyWishlist(this.userId)
      .subscribe(data => {this.wishlistData = data;
      this.count = this.wishlistData.count;
      });
  }
  get isLoggedIn(): boolean {
    // expiration and user is signed in locally
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  checkAvailability(prdctDetId: number, subPrdctDetId: number) {
    if (!this.isLoggedIn) {
      const dialogRef = this.dialog.open(LoginDialogComponent, {
        // width: '100%',
        disableClose: true,
        data: {},
        panelClass: 'login-dialog-box'
      });
    } else {
      const dialogRef = this.dialog.open(CheckAvailabilityDialogComponent, {
        width: '45%',
        data: {prdctDetId: prdctDetId, subHallId: subPrdctDetId},
        panelClass: 'check-availability-dialog'
      });
    }
  }

  deleteDialog(userId: number,
               prdctDetId: number,
               prdctDetDesc: string,
  ) {
    this.prdctDetId = prdctDetId;
    const dialogRef = this.dialog.open(DialogComponent, {
      disableClose: true,
      data: {
        userId: userId,
        prdctDetId: prdctDetId,
        prdctDetDesc: prdctDetDesc
      }
    });
  }

}
