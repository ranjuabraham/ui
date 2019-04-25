import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {ProcessReviews} from './process-reviews';
import {HttpErrorHandler} from '../../../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})
export class ProcessReviewsService {

  private processReviewsUrl = '/ema/admin/process-review-load';
  private createFacilityCategoryUrl = '/ema/admin/fac-catg-update';
  private updateProcessReviewsUrl = '/ema/admin/fac-catg-edit';

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
  }

  /* GET Process Reviews from the server */
  getProcessReviews(): Observable<ProcessReviews[]> {
    return this.http.get<ProcessReviews[]>(this.processReviewsUrl);
  }
  /** PUT: update the hero on the server. Returns the updated hero upon success. */
  updateFacilityCategory(category: ProcessReviews): Observable<ProcessReviews> {
    return this.http.post<ProcessReviews>(this.updateProcessReviewsUrl, category, httpOptions)
      .pipe(map(res => res),  catchError(this.handleError));
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
