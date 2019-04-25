import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {BehaviorSubject} from 'rxjs';
import {VenueDetails} from './venue-details';
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
export class VenueDetailsService {
  private showUrl = 'ema/admin/venue-list-load';
  private createUrl = '/ema/admin/venue-list-update';
  private editUrl = '/ema/admin/venue-list-edit';
  private venueTypeUrl = 'ema/admin/venue-catg-load';

  dataChange: BehaviorSubject<VenueDetails[]> = new BehaviorSubject<VenueDetails[]>([]);
// Temporarily stores data from dialogs
  dialogData: any;

  constructor(
    private http: HttpClient) {
  }

  /* GET Venue Details from the server */
  getVenueDetails(): Observable<VenueDetails[]> {
    return this.http.get<VenueDetails[]>(this.showUrl);
  }

  /* GET help management type from the server */
  getVenueType(): Observable<VenueDetails[]> {
    return this.http.get<VenueDetails[]>(this.venueTypeUrl);
  }
  getVenueById(prdctId: number): Observable<any> {
    const url = `${this.editUrl}/${prdctId}`;
    return this.http.get(url, httpOptions);
  }

  ///// Save Method //////
  /** POST: add a new venue details to the database **/
  addVenueDetails(category: VenueDetails): Observable<VenueDetails> {
    return this.http.post<VenueDetails>(this.createUrl, category, httpOptions)
      .pipe(map(res => res), catchError(this.handleError));
  }


  /** POST: update the venue details on the server. Returns the updated Venue details upon success. */
  updateVenueDetails(category: VenueDetails): Observable<VenueDetails> {
    return this.http.post<VenueDetails>(this.createUrl, category, httpOptions)
      .pipe(map(res => res), catchError(this.handleError));
  }


  getDialogData() {
    return this.dialogData;
  }
  updateIssue (issue: VenueDetails): void {
    this.dialogData = issue;
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
