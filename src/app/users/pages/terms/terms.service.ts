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
export class TermsService {

  private termsUrl = '/ema/venue/hd-footer';
  constructor(
    private http: HttpClient) {
  }

  /* GET terms from the server */
  terms(id: number): Observable<any> {
    const url = `${this.termsUrl}/${id}`;
    return this.http.get(url, httpOptions);
  }
  private handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    errMsg = error.error;
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
