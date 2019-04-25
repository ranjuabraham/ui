import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {ReconcileReport} from './reconcile-report';
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
export class ReconcileReportService {
  private filterUrl = 'ema/admin/load-reconcile-report';
  private getVenueCategoryIdUrl = 'ema/admin/venue-master-load';

  constructor(
    private http: HttpClient) {
  }

  /* GET Venue Name from the server */
  getVenueName(): Observable<ReconcileReport[]> {
    return this.http.get<ReconcileReport[]>(this.getVenueCategoryIdUrl);
  }

  ///// Save Method //////
  /** POST: add a new venue details to the database **/
  reconcileReport(data: ReconcileReport): Observable<ReconcileReport> {
    return this.http.post<ReconcileReport>(this.filterUrl, data, httpOptions).pipe(catchError(this.handleError));
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
