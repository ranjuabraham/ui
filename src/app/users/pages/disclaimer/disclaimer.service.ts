import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DisclaimerService {

  private disclaimerUrl = '/ema/venue/hd-footer';
  constructor(
    private http: HttpClient) {
  }

  /* GET disclaimer us from the server */
  disclaimer(id: number): Observable<any> {
    const url = `${this.disclaimerUrl}/${id}`;
    return this.http.get(url, httpOptions);
  }
  private handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    errMsg = error.error;
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
