import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpErrorHandler} from '../../../http-error-handler.service';
import {MuhurthamDates} from './muhurtham-dates';
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
export class MuhurthamDatesService {
  private createUrl = '/ema/admin/muhurtham-dates-update';


  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
  }
  ///// Save Method //////
  /** POST: add a new Muhurtham Dates to the database **/
  addMuhurthamDates(datas: MuhurthamDates): Observable<MuhurthamDates> {
    return this.http.post<MuhurthamDates>(this.createUrl, datas, httpOptions)
      .pipe(map(res => res), catchError(this.handleError));
  }

  /** PUT: update the hero on the server. Returns the updated hero upon success. */
  // updateSearchCategory(category: SearchCategory): Observable<SearchCategory> {
  //   return this.http.post<SearchCategory>(this.createUrl, category, httpOptions)
  //     .map(res => res)
  //     .catch(this.handleError);
  // }

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
