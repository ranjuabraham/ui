import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {HttpErrorHandler} from '../../../http-error-handler.service';
import {Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import {RemoveTestBookings} from './remove-test-bookings';
import {VenueDetails} from '../venue-management/venue-details/venue-details';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RemoveTestBookingsService {

  private removeTestBookingshowUrl = '/ema/admin/venue-list-load';
  private removeTestBookingDeleteUrl = '/ema/admin/clear-block';

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
  }
  /* GET Remove Test Booking from the server */
  getRemoveTestBooking(): Observable<RemoveTestBookings[]> {
    return this.http.get<RemoveTestBookings[]>(this.removeTestBookingshowUrl);
  }
  //
  // /** DELETE: delete the Remove test Booking record from the server */
  // deleteRemoveTestBooking (prdctDetId) {
  //   const url = `${this.removeTestBookingDeleteUrl}/${prdctDetId}`;
  //   return this.http.get(url, httpOptions);
  // }


  private handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    errMsg = error.error;
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
