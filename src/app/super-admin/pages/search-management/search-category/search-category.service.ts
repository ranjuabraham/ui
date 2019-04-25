import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {HttpErrorHandler, HandleError} from '../../../../http-error-handler.service';
import {Observable, throwError} from 'rxjs';
import {SearchCategory} from './search-category';
import {catchError, map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})
export class SearchCategoryService {
  private searchCategoryUrl = '/ema/admin/search-catg-load';
  private createSearchCategoryUrl = '/ema/admin/search-catg-update';
  private editSearchCategoryUrl = '/ema/admin/search-catg-edit';


  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
  }

  /* GET contacts from the server */
  getSearchCategory(): Observable<SearchCategory[]> {
    return this.http.get<SearchCategory[]>(this.searchCategoryUrl);
  }

  getSearchById(prdctId: number): Observable<any> {
    const url = `${this.editSearchCategoryUrl}/${prdctId}`;
    return this.http.get(url, httpOptions);
  }

  ///// Save Method //////
  /** POST: add a new contact to the database **/
  addSearchCategory(category: SearchCategory): Observable<SearchCategory> {
    return this.http.post<SearchCategory>(this.createSearchCategoryUrl, category, httpOptions)
      .pipe(map(res => res), catchError(this.handleError));
  }

  /** PUT: update the hero on the server. Returns the updated hero upon success. */
  updateSearchCategory(category: SearchCategory): Observable<SearchCategory> {
    return this.http.post<SearchCategory>(this.createSearchCategoryUrl, category, httpOptions)
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
