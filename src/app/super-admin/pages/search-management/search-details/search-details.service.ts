import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {HttpErrorHandler, HandleError} from '../../../../http-error-handler.service';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {throwError} from 'rxjs';
import {SearchDetails} from './search-details';
import {VenueDetails} from '../../venue-management/venue-details/venue-details';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})
export class SearchDetailsService {
  private showUrl = '/ema/admin/search-list-load';
  private createUrl = '/ema/admin/search-list-update';
  private editUrl = '/ema/admin/search-list-edit';
  private searchTypeUrl = '/ema/admin/search-catg-load';


  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
  }

  /* GET Search management type from the server */
  getSearchType(): Observable<SearchDetails[]> {
    return this.http.get<SearchDetails[]>(this.searchTypeUrl);
  }

  /* GET contacts from the server */
  getSearchDetails(): Observable<SearchDetails[]> {
    return this.http.get<SearchDetails[]>(this.showUrl);
  }

  getDetailsById(searchDetId: number): Observable<any> {
    const url = `${this.editUrl}/${searchDetId}`;
    return this.http.get(url, httpOptions);
  }

  ///// Save Method //////
  /** POST: add a new Search details to the database **/
  addSearchDetails(details: SearchDetails): Observable<SearchDetails> {
    return this.http.post<SearchDetails>(this.createUrl, details, httpOptions)
      .pipe(map(res => res), catchError(this.handleError));
  }

  /** PUT: update the Search Details on the server */
  updateSearchDetails(details: SearchDetails): Observable<SearchDetails> {
    return this.http.post<SearchDetails>(this.createUrl, details, httpOptions)
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
