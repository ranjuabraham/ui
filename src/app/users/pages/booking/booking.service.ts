import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {HttpErrorHandler} from '../../../http-error-handler.service';
import {Observable} from 'rxjs';
import {VenueCategory} from '../../../super-admin/pages/venue-management/venue-category/venue-category';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private historicalBookingUrl = '/ema/login/booking-history';

  // private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    // this.handleError = httpErrorHandler.createHandleError('VenueCategoryService');
  }

  // /* GET contacts from the server */
  // getVenueCategory(): Observable<VenueCategory[]> {
  //   return this.http.get<VenueCategory[]>(this.venueCategoryUrl);
  // }

  /* GET historical Booking from the server */
  // getHistoricalBooking(userId: number, categoryId: number): Observable<any> {
  //   const url = `${this.historicalBookingUrl}/${userId}/${categoryId}`;
  //   return this.http.get(url, httpOptions);
  // }


  /* GET historical Booking from the server */
  getHistoricalBooking(prdctDetId: string, userId: string, userType: string, typeId: string, bookingId: string): Observable<any> {
    const url = '/ema/login/booking-history';
    const params = new HttpParams()
      .set('prdctDetId', prdctDetId)
      .set('userId', userId)
      .set('userType', userType)
      .set('typeId', typeId)
      .set('bookingId', bookingId);
    // console.log(params.toString());
    return this.http.get<any>(url, {params});
  }



  private handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    errMsg = error.error;
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
