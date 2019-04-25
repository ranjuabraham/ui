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
export class FaqService {

  private faqUrl = '/ema/venue/hd-footer';
  constructor(
    private http: HttpClient) {
  }

  /* GET faq from the server */
  faq(id: number): Observable<any> {
    const url = `${this.faqUrl}/${id}`;
    return this.http.get(url, httpOptions);
  }
  private handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    errMsg = error.error;
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
