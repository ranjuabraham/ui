import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {HttpErrorHandler, HandleError} from '../../../http-error-handler.service';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {HelpManagement} from './help-management';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})
export class HelpManagementService {
  private showUrl = '/ema/admin/help-catg-load';
  private createUrl = '/ema/admin/help-catg-update';
  private updateUrl = '/ema/admin/help-catg-edit';
  private helpTypeUrl = '/ema/admin/help-type-load';

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
  }

  /* GET contacts from the server */
  getHelpCategory(): Observable<HelpManagement[]> {
    return this.http.get<HelpManagement[]>(this.showUrl);
  }

  /* GET contacts from the server */
  getHelpType(): Observable<HelpManagement[]> {
    return this.http.get<HelpManagement[]>(this.helpTypeUrl).pipe(catchError(this.handleError));
  }

  getHelpById(helpId: number): Observable<any> {
    const url = `${this.updateUrl}/${helpId}`;
    return this.http.get(url, httpOptions).pipe( catchError(this.handleError));
  }


  /** POST: add a new help category to the database **/
  addHelpCategory(category: HelpManagement): Observable<HelpManagement> {
    return this.http.post<HelpManagement>(this.createUrl, category, httpOptions)
      .pipe(map(res => res), catchError(this.handleError));
  }

  /** PUT: update the help category on the server. Returns the updated help upon success. */
  updateHelpCategory(category: HelpManagement): Observable<HelpManagement> {
    return this.http.post<HelpManagement>(this.createUrl, category, httpOptions)
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
