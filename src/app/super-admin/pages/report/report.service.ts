import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Report} from './report';
import {catchError, map} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private venueTypeUrl = 'ema/admin/venue-category-load';
  private getVenueCategoryIdUrl = 'ema/admin/load-hall-list';
  private filterUrl = 'ema/admin/load-hall-report';

  constructor(
    private http: HttpClient) {
  }
  /* GET Venue Type type from the server */
  getVenueType(): Observable<Report[]> {
    return this.http.get<Report[]>(this.venueTypeUrl);
  }

  /* GET Venue name Id from the server */
  getVenueCategoryId(rptPrdctId: number): Observable<any> {
    const url = `${this.getVenueCategoryIdUrl}/${rptPrdctId}`;
    return this.http.get(url, httpOptions);
  }
  ///// Save Method //////
  /** POST: add a new venue details to the database **/
  filterReport(data: Report): Observable<Report> {
    return this.http.post<Report>(this.filterUrl, data, httpOptions)
      .pipe(map(res => res), catchError(this.handleError));
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {// client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {// server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
