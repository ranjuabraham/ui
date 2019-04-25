import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {HttpErrorHandler, HandleError} from '../../../../http-error-handler.service';
// import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import {FacilityCategory} from './facility-category';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})
export class FacilityCategoryService {
  private facilityCategoryUrl = '/ema/admin/fac-catg-load';
  private createFacilityCategoryUrl = '/ema/admin/fac-catg-update';
  private editFacilityCategoryUrl = '/ema/admin/fac-catg-edit';

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
  }

  /* GET contacts from the server */
  getFacilityCategory(): Observable<FacilityCategory[]> {
    return this.http.get<FacilityCategory[]>(this.facilityCategoryUrl).pipe(catchError(this.handleError));
  }

  getFacilityById(facId: number): Observable<any> {
    const url = `${this.editFacilityCategoryUrl}/${facId}`;
    return this.http.get(url, httpOptions).pipe(catchError(this.handleError));
  }


  /** POST: add a new contact to the database **/
  addFacilityCategory(category: FacilityCategory): Observable<FacilityCategory> {
    return this.http.post<FacilityCategory>(this.createFacilityCategoryUrl, category, httpOptions)
      .pipe(map(res => res),
        catchError(this.handleError));
  }

  /** PUT: update the hero on the server. Returns the updated hero upon success. */
  updateFacilityCategory(category: FacilityCategory): Observable<FacilityCategory> {
    return this.http.post<FacilityCategory>(this.createFacilityCategoryUrl, category, httpOptions)
      .pipe(map(res => res),
        catchError(this.handleError));
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
