import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {HttpErrorHandler} from '../../../http-error-handler.service';
import {Observable} from 'rxjs';
import {MyWishlist} from './my-wishlist';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MyWishlistService {


  private wishlistUrl = '/ema/login/my-favourites';
  private deletetUrl = '/ema/login/remove-favourites';

  // private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    // this.handleError = httpErrorHandler.createHandleError('VenueCategoryService');
  }

  getMyWishlist(userId: number): Observable<any> {
    const url = `${this.wishlistUrl}/${userId}`;
    return this.http.get(url, httpOptions);
  }
  getMyWishlistDelete(userId: number, prdctId: number): Observable<any> {
    const url = `${this.wishlistUrl}/${userId}/${prdctId}`;
    return this.http.get(url, httpOptions);
  }
  private handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    errMsg = error.error;
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
