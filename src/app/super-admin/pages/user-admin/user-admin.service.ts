import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {HttpErrorHandler} from '../../../http-error-handler.service';
import {Observable, throwError} from 'rxjs';
import {UserAdmin} from './user-admin';
import {catchError} from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})
export class UserAdminService {

  private showUserAdminUrl = '/ema/admin/admin-map-load';
  private createUserAdminUrl = '/ema/admin/admin-map-update';
  private editUserAdminUrl = '/ema/admin/admin-map-edit';
  private venueDetailUrl = '/ema/admin/venue-list-load';

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
  }

  /* GET User Admin list from the server */
  getUserAdmin(): Observable<UserAdmin[]> {
    return this.http.get<UserAdmin[]>(this.showUserAdminUrl);
  }

  /* GET contacts from the server */
  getVenueDetail(): Observable<UserAdmin[]> {
    return this.http.get<UserAdmin[]>(this.venueDetailUrl);
  }

  getUserAdminById(usrId: number): Observable<any> {
    const url = `${this.editUserAdminUrl}/${usrId}`;
    return this.http.get(url, httpOptions);
  }

  ///// Save Method //////
  /** POST: add a new contact to the database **/
  // addHelpCategory(category: HelpManagement): Observable<HelpManagement> {
  //   return this.http.post<HelpManagement>(this.createUrl, category, httpOptions)
  //     .map(res => res)
  //     .catch(this.handleError);
  // }

  /** PUT: update the hero on the server. Returns the updated hero upon success. */
  updateVenueDetails(data: UserAdmin): Observable<UserAdmin> {
    return this.http.post<UserAdmin>(this.createUserAdminUrl, data, httpOptions).pipe(catchError(this.handleError));
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
