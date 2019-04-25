import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {VenueCategory} from './venue-category';
// import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import {HttpErrorHandler, HandleError} from '../../../../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class VenueCategoryService {
  private venueCategoryUrl = 'ema/admin/venue-catg-load';
  private createVenueCategoryUrl = '/ema/admin/venue-catg-update';
  private editVenueCategoryUrl = '/ema/admin/venue-catg-edit';

  // private handleError: HandleError;

  constructor(
    private http: HttpClient) {
  }

  /* GET venue category from the server */
  getVenueCategory(): Observable<VenueCategory[]> {
    return this.http.get<VenueCategory[]>(this.venueCategoryUrl);
  }

  getVenueById(prdctId: number): Observable<any> {
    const url = `${this.editVenueCategoryUrl}/${prdctId}`;
    return this.http.get(url, httpOptions);
  }

  ///// Save Method //////
  /** POST: add a new venue category to the database **/
  addVenueCategory(category: VenueCategory): Observable<VenueCategory> {
    return this.http.post<VenueCategory>(this.createVenueCategoryUrl, category, httpOptions)
      .pipe(map(res => res), catchError(this.handleError));
  }


  /** PUT: update the venue category on the server. Returns the updated venue category upon success. */
  updateVenueCategory(category: VenueCategory): Observable<VenueCategory> {
    return this.http.post<VenueCategory>(this.createVenueCategoryUrl, category, httpOptions)
      .pipe(map(res => res), catchError(this.handleError));
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
