import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {HttpErrorHandler} from '../../../http-error-handler.service';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class MyReviewsService {
  private myReviewsUrl = '/ema/login/my-reviews';
  private reviseReviewEditUrl = '/ema/login/edit-reviews';
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
  }
  getMyReviews(userId: number): Observable<any> {
    const url = `${this.myReviewsUrl}/${userId}`;
    return this.http.get(url, httpOptions);
  }
  reviseReviewEdit(rvwId: number): Observable<any> {
    const url = `${this.reviseReviewEditUrl}/${rvwId}`;
    return this.http.get(url, httpOptions);
  }
  private handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    errMsg = error.error;
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
