import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Banner} from './banner';
const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  private venueTypeUrl = 'ema/venue/hint-list';

  constructor(
    private http: HttpClient) {
  }
  /* GET Venue type from the server */
  getVenueType(): Observable<Banner[]> {
    return this.http.get<Banner[]>(this.venueTypeUrl);
  }
  private handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    errMsg = error.error;
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
